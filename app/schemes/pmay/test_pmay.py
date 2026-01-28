import pandas as pd
import joblib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

pipeline = joblib.load(BASE_DIR / "pipeline.pkl")

def test_prediction():
    input_data = {
        "age": 32,
        "annual_income": 90000,
        "state": "Maharashtra",
        "gender": "female",
        "occupation": "laborer"
    }

    df = pd.DataFrame([input_data])

    probability = pipeline.predict_proba(df)[0][1]
    eligible = probability >= 0.5

    print("PMAY Prediction Test")
    print("-------------------")
    print(f"Eligible: {eligible}")
    print(f"Approval Probability: {probability:.2f}")
    print("Expected Benefit: ₹250000" if eligible else "Expected Benefit: ₹0")

if __name__ == "__main__":
    test_prediction()
