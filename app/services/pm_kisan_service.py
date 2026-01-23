from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import joblib
from pathlib import Path

router = APIRouter(prefix="/api", tags=["PM-KISAN"])

# ---------- REQUEST SCHEMA ----------
class PMKisanRequest(BaseModel):
    land_size_acres: float
    annual_income: float
    owns_land: int
    is_farmer: int


# ---------- MODEL LOADING ----------
BASE_DIR = Path(__file__).resolve().parent.parent / "models" / "pm_kisan"
MODEL_PATH = BASE_DIR / "pipeline.pkl"

_pipeline = None

def get_pipeline():
    global _pipeline
    if _pipeline is None:
        if not MODEL_PATH.exists():
            raise HTTPException(
                status_code=500,
                detail="PM-KISAN model not found. Train the model first."
            )
        try:
            _pipeline = joblib.load(MODEL_PATH)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to load PM-KISAN model: {str(e)}"
            )
    return _pipeline


# ---------- EXPLANATION LOGIC ----------
def explain_pm_kisan(data: PMKisanRequest):
    reasons = []

    if data.is_farmer:
        reasons.append("Applicant is a registered farmer")
    else:
        reasons.append("Applicant is not registered as a farmer")

    if data.owns_land:
        reasons.append("Applicant owns agricultural land")
    else:
        reasons.append("Applicant does not own agricultural land")

    if data.annual_income <= 150000:
        reasons.append("Annual income is within PM-KISAN eligibility limit")
    else:
        reasons.append("Annual income exceeds PM-KISAN eligibility limit")

    return reasons


# ---------- API ENDPOINT ----------
@router.post("/pm-kisan/predict")
def predict_pm_kisan(data: PMKisanRequest):
    pipeline = get_pipeline()

    features = [[
        data.land_size_acres,
        data.annual_income,
        data.owns_land,
        data.is_farmer
    ]]

    prediction = pipeline.predict(features)[0]
    probability = pipeline.predict_proba(features)[0][1]

    explanation = explain_pm_kisan(data)

    return {
        "scheme": "PM-KISAN",
        "eligible": bool(prediction),
        "approval_probability": round(float(probability), 2),
        "expected_annual_benefit": 6000 if prediction else 0,
        "explanation": explanation
    }
