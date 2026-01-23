from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import joblib
from pathlib import Path

router = APIRouter(prefix="/api", tags=["Ayushman Bharat"])

class AyushmanRequest(BaseModel):
    annual_income: float
    family_size: int
    is_govt_employee: int


BASE_DIR = Path(__file__).resolve().parent.parent / "models" / "ayushman"
MODEL_PATH = BASE_DIR / "pipeline.pkl"

_pipeline = None

def get_pipeline():
    global _pipeline
    if _pipeline is None:
        if not MODEL_PATH.exists():
            raise HTTPException(500, "Ayushman model not found")
        _pipeline = joblib.load(MODEL_PATH)
    return _pipeline


def explain_ayushman(data: AyushmanRequest):
    reasons = []

    if data.annual_income <= 250000:
        reasons.append("Income is within Ayushman Bharat threshold")
    else:
        reasons.append("Income exceeds Ayushman Bharat threshold")

    if data.family_size >= 2:
        reasons.append("Family size meets minimum requirement")
    else:
        reasons.append("Family size is too small")

    if data.is_govt_employee == 0:
        reasons.append("Applicant is not a government employee")
    else:
        reasons.append("Government employees are excluded")

    return reasons


@router.post("/ayushman/predict")
def predict_ayushman(data: AyushmanRequest):
    pipeline = get_pipeline()

    features = [[
        data.annual_income,
        data.family_size,
        data.is_govt_employee
    ]]

    prediction = pipeline.predict(features)[0]
    probability = pipeline.predict_proba(features)[0][1]

    return {
        "scheme": "Ayushman Bharat (PM-JAY)",
        "eligible": bool(prediction),
        "approval_probability": round(float(probability), 2),
        "health_coverage_amount": 500000 if prediction else 0,
        "explanation": explain_ayushman(data)
    }
