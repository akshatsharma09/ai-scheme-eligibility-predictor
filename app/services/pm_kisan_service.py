from fastapi import APIRouter
from pydantic import BaseModel
import joblib
from pathlib import Path

# ✅ Create router (THIS WAS MISSING)
router = APIRouter(tags=["PM-KISAN"])

# 📍 Load model safely
BASE_DIR = Path(__file__).resolve().parent.parent / "models" / "pm_kisan"
MODEL_PATH = BASE_DIR / "model.pkl"

model = joblib.load(MODEL_PATH)

# ------------------ Request Schema ------------------

class PMKisanRequest(BaseModel):
    land_size_acres: float
    annual_income: float
    owns_land: int
    is_farmer: int

# ------------------ API Endpoint ------------------

@router.post("/pm-kisan/predict")
def predict_pm_kisan(data: PMKisanRequest):
    features = [[
        data.land_size_acres,
        data.annual_income,
        data.owns_land,
        data.is_farmer
    ]]

    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0][1]

    return {
        "scheme": "PM-KISAN",
        "eligible": bool(prediction),
        "approval_probability": round(probability, 2),
        "annual_benefit": 6000 if prediction else 0
    }
