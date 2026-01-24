from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import joblib
from pathlib import Path

router = APIRouter(prefix="/api", tags=["PMAY"])

class PMAYRequest(BaseModel):
    age: int
    annual_income: float
    is_female: int
    is_laborer: int

BASE_DIR = Path(__file__).resolve().parent.parent / "models" / "pmay"
MODEL_PATH = BASE_DIR / "pipeline.pkl"

_pipeline = None

def get_pipeline():
    global _pipeline
    if _pipeline is None:
        if not MODEL_PATH.exists():
            raise HTTPException(status_code=500, detail="PMAY model not found. Train the model first.")
        _pipeline = joblib.load(MODEL_PATH)
    return _pipeline

def explain_pmay(data: PMAYRequest):
    reasons = []
    reasons.append("Applicant is female" if data.is_female else "Applicant is not female")
    reasons.append("Annual income is within PMAY limit" if data.annual_income <= 120000 else "Annual income exceeds PMAY limit")
    return reasons

@router.post("/pmay/predict")
def predict_pmay(data: PMAYRequest):
    pipeline = get_pipeline()
    features = [[data.age, data.annual_income, data.is_female, data.is_laborer]]
    prediction = pipeline.predict(features)[0]
    probability = pipeline.predict_proba(features)[0][1]
    explanation = explain_pmay(data)
    return {
        "scheme": "PMAY",
        "eligible": bool(prediction),
        "approval_probability": round(float(probability), 2),
        "expected_annual_benefit": 250000 if prediction else 0,
        "explanation": explanation
    }
