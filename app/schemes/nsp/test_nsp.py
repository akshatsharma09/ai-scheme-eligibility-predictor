import pandas as pd
import joblib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

pipeline = joblib.load(BASE_DIR / "pipeline.pkl")

def test_prediction():
    input_data = {
        "age": 20,
        "annual_income": 100000,
        "state": "Maharashtra",
        "gender": "male",
        "student_class": 12
    }

    df = pd.DataFrame([input_data])

    probability = pipeline.predict_proba(df)[0][1]
    eligible = probability >= 0.5

    print("NSP Prediction Test")
    print("------------------")
    print(f"Eligible: {eligible}")
    print(f"Approval Probability: {probability:.2f}")
    print("Expected Scholarship: ₹50000" if eligible else "Expected Scholarship: ₹0")

if __name__ == "__main__":
    test_prediction()
