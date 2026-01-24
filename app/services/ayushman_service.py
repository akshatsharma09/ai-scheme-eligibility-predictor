from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import joblib
from pathlib import Path

router = APIRouter(prefix="/api", tags=["Ayushman"])

class AyushmanRequest(BaseModel):
    age: int
    annual_income: float
    has_family_id: int

BASE_DIR = Path(__file__).resolve().parent.parent / "models" / "ayushman"
MODEL_PATH = BASE_DIR / "pipeline.pkl"

_pipeline = None

def get_pipeline():
    global _pipeline
    if _pipeline is None:
        if not MODEL_PATH.exists():
            raise HTTPException(status_code=500, detail="Ayushman Bharat model not found. Train the model first.")
        _pipeline = joblib.load(MODEL_PATH)
    return _pipeline

def explain_ayushman(data: AyushmanRequest):
    reasons = []
    reasons.append("Applicant has family ID" if data.has_family_id else "Applicant does not have family ID")
    reasons.append("Income is within Ayushman eligibility limit" if data.annual_income <= 120000 else "Income exceeds eligibility limit")
    return reasons

@router.post("/ayushman/predict")
def predict_ayushman(data: AyushmanRequest):
    pipeline = get_pipeline()
    features = [[data.age, data.annual_income, data.has_family_id]]
    prediction = pipeline.predict(features)[0]
    probability = pipeline.predict_proba(features)[0][1]
    explanation = explain_ayushman(data)
    return {
        "scheme": "Ayushman Bharat",
        "eligible": bool(prediction),
        "approval_probability": round(float(probability), 2),
        "expected_annual_health_cover": 500000 if prediction else 0,
        "explanation": explanation
    }
