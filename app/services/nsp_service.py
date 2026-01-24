from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import joblib
from pathlib import Path

router = APIRouter(prefix="/api", tags=["NSP"])

class NSPRequest(BaseModel):
    age: int
    annual_income: float
    student_class: int

BASE_DIR = Path(__file__).resolve().parent.parent / "models" / "nsp"
MODEL_PATH = BASE_DIR / "pipeline.pkl"

_pipeline = None

def get_pipeline():
    global _pipeline
    if _pipeline is None:
        if not MODEL_PATH.exists():
            raise HTTPException(status_code=500, detail="NSP model not found. Train the model first.")
        _pipeline = joblib.load(MODEL_PATH)
    return _pipeline

def explain_nsp(data: NSPRequest):
    reasons = []
    reasons.append("Income is within NSP limit" if data.annual_income <= 120000 else "Income exceeds NSP limit")
    reasons.append("Class is eligible" if data.student_class in [10, 12] else "Class is not eligible")
    return reasons

@router.post("/nsp/predict")
def predict_nsp(data: NSPRequest):
    pipeline = get_pipeline()
    features = [[data.age, data.annual_income, data.student_class]]
    prediction = pipeline.predict(features)[0]
    probability = pipeline.predict_proba(features)[0][1]
    explanation = explain_nsp(data)
    return {
        "scheme": "NSP",
        "eligible": bool(prediction),
        "approval_probability": round(float(probability), 2),
        "expected_scholarship": 50000 if prediction else 0,
        "explanation": explanation
    }
