import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
import joblib
from pathlib import Path

np.random.seed(42)
n = 600

data = pd.DataFrame({
    "annual_income": np.random.uniform(30000, 400000, n),
    "family_size": np.random.randint(1, 8, n),
    "is_govt_employee": np.random.choice([0, 1], n, p=[0.85, 0.15])
})

data["eligible"] = (
    (data["annual_income"] <= 250000) &
    (data["is_govt_employee"] == 0) &
    (data["family_size"] >= 2)
).astype(int)

X = data.drop("eligible", axis=1)
y = data["eligible"]

pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", LogisticRegression())
])

pipeline.fit(X, y)

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "pipeline.pkl"

joblib.dump(pipeline, MODEL_PATH)

print("✅ Ayushman Bharat model saved:", MODEL_PATH)
print("📦 Size:", MODEL_PATH.stat().st_size)
