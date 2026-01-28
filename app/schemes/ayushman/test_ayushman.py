import pandas as pd
import joblib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

pipeline = joblib.load(BASE_DIR / "pipeline.pkl")

def test_prediction():
    input_data = {
        "age": 40,
        "annual_income": 90000,
        "has_family_id": 1,
        "state": "Maharashtra"
    }

    df = pd.DataFrame([input_data])

    probability = pipeline.predict_proba(df)[0][1]
    eligible = probability >= 0.5

    print("Ayushman Bharat Prediction Test")
    print("------------------------------")
    print(f"Eligible: {eligible}")
    print(f"Approval Probability: {probability:.2f}")
    print("Expected Annual Health Cover: ₹500000" if eligible else "Expected Annual Health Cover: ₹0")

if __name__ == "__main__":
    test_prediction()
