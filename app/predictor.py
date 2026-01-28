from typing import List, Optional

from fastapi import APIRouter
from pydantic import BaseModel
import joblib
from pathlib import Path

from app.schemes.pm_kisan.features import extract_model_features as pmkisan_features
from app.schemes.pm_kisan.rules import evaluate_eligibility as pmkisan_rules
from app.schemes.pmay.features import extract_model_features as pmay_features
from app.schemes.pmay.rules import evaluate_eligibility as pmay_rules
from app.schemes.nsp.features import extract_model_features as nsp_features
from app.schemes.nsp.rules import evaluate_eligibility as nsp_rules
from app.utils.bias_checker import run_bias_audit
from app.utils.explainability import build_explanation_payload, load_scheme_metadata


router = APIRouter()


class PredictRequest(BaseModel):
    age: int
    annual_income: float
    gender: str
    state: str
    occupation: str
    land_holding_acres: Optional[float] = None


class SchemeResult(BaseModel):
    scheme: str
    eligible: bool
    approval_probability: float
    expected_annual_benefit: float
    explanation: dict


class FairnessReport(BaseModel):
    status: str
    metric: str
    details: dict
    explanation: str


class PredictResponse(BaseModel):
    schemes: List[SchemeResult]
    fairness: FairnessReport
    ethical_disclaimer: str


def _load_model(scheme_id: str):
    base = Path(__file__).resolve().parent / "schemes" / scheme_id
    model_path = base / "model.pkl"
    if not model_path.exists():
        raise FileNotFoundError(f"Model file not found for scheme {scheme_id}")
    return joblib.load(model_path)


@router.post("/predict", response_model=PredictResponse)
def unified_predict(payload: PredictRequest):
    """Single entry point that fans out to all schemes."""

    req = payload.dict()

    results: List[SchemeResult] = []

    # PM-KISAN
    pmk_model = _load_model("pm_kisan")
    pmk_eligible, pmk_reason = pmkisan_rules(
        {
            "land_size_acres": req.get("land_holding_acres") or 1.0,
            "annual_income": req["annual_income"],
            "owns_land": 1 if req["occupation"] == "farmer" else 0,
            "is_farmer": 1 if req["occupation"] == "farmer" else 0,
        }
    )
    if pmk_eligible:
        features = pmkisan_features(
            {
                "land_size_acres": req.get("land_holding_acres") or 1.0,
                "annual_income": req["annual_income"],
                "owns_land": 1 if req["occupation"] == "farmer" else 0,
                "is_farmer": 1 if req["occupation"] == "farmer" else 0,
            }
        )
        prob = float(pmk_model.predict_proba([features])[0][1])
        meta = load_scheme_metadata("pm_kisan")
        benefit = float(meta.get("benefit_amount", {}).get("value", 6000))
        explanation = build_explanation_payload(
            scheme_id="pm_kisan",
            scheme_display_name=meta.get("scheme_name", "PM-KISAN"),
            rule_eligible=pmk_eligible,
            rule_reason=pmk_reason,
            approval_probability=prob,
        )
        results.append(
            SchemeResult(
                scheme="PM-KISAN",
                eligible=True,
                approval_probability=round(prob * 100, 2),
                expected_annual_benefit=benefit,
                explanation=explanation,
            )
        )

    # PMAY
    pmay_model = _load_model("pmay")
    pmay_eligible, pmay_reason = pmay_rules(
        {
            "age": req["age"],
            "annual_income": req["annual_income"],
            "is_laborer": 1 if req["occupation"] in {"farmer"} else 0,
        }
    )
    if pmay_eligible:
        features = pmay_features(
            {
                "age": req["age"],
                "annual_income": req["annual_income"],
                "is_laborer": 1 if req["occupation"] in {"farmer"} else 0,
            }
        )
        prob = float(pmay_model.predict_proba([features])[0][1])
        meta = load_scheme_metadata("pmay")
        benefit = float(meta.get("benefit_amount", {}).get("value", 250000))
        explanation = build_explanation_payload(
            scheme_id="pmay",
            scheme_display_name=meta.get("scheme_name", "PMAY"),
            rule_eligible=pmay_eligible,
            rule_reason=pmay_reason,
            approval_probability=prob,
        )
        results.append(
            SchemeResult(
                scheme="PMAY",
                eligible=True,
                approval_probability=round(prob * 100, 2),
                expected_annual_benefit=benefit,
                explanation=explanation,
            )
        )

    # NSP
    nsp_model = _load_model("nsp")
    nsp_eligible, nsp_reason = nsp_rules(
        {
            "age": req["age"],
            "annual_income": req["annual_income"],
            "student_class": 12 if req["occupation"] == "student" else 10,
        }
    )
    if nsp_eligible:
        features = nsp_features(
            {
                "age": req["age"],
                "annual_income": req["annual_income"],
                "student_class": 12 if req["occupation"] == "student" else 10,
            }
        )
        prob = float(nsp_model.predict_proba([features])[0][1])
        meta = load_scheme_metadata("nsp")
        benefit = float(meta.get("benefit_amount", {}).get("value", 50000))
        explanation = build_explanation_payload(
            scheme_id="nsp",
            scheme_display_name=meta.get("scheme_name", "NSP"),
            rule_eligible=nsp_eligible,
            rule_reason=nsp_reason,
            approval_probability=prob,
        )
        results.append(
            SchemeResult(
                scheme="NSP",
                eligible=True,
                approval_probability=round(prob * 100, 2),
                expected_annual_benefit=benefit,
                explanation=explanation,
            )
        )

    # Fairness audit: one prediction per scheme by gender group
    preds = [1] * len(results)
    groups = [payload.gender for _ in results]

    fairness_policy = load_scheme_metadata("pm_kisan").get(
        "fairness_policy", {}
    )
    allowed_diff = float(fairness_policy.get("allowed_bias_threshold", 0.1))

    bias = run_bias_audit(preds, groups, allowed_diff=allowed_diff)

    ethical_disclaimer = (
        load_scheme_metadata("pm_kisan").get(
            "ethical_disclaimer",
            "This tool is a demonstration and must not be used for official government decisions.",
        )
    )

    return PredictResponse(
        schemes=results,
        fairness=FairnessReport(
            status=bias.status,
            metric=bias.metric,
            details=bias.details,
            explanation=bias.explanation,
        ),
        ethical_disclaimer=ethical_disclaimer,
    )


