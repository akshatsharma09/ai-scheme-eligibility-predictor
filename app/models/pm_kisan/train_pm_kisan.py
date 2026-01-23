import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
import joblib
from pathlib import Path

# ---------- DATA GENERATION ----------
np.random.seed(42)
n = 500

data = pd.DataFrame({
    "land_size_acres": np.random.uniform(0.1, 5, n),
    "annual_income": np.random.uniform(20000, 200000, n),
    "owns_land": np.random.choice([0, 1], n, p=[0.2, 0.8]),
    "is_farmer": np.random.choice([0, 1], n, p=[0.1, 0.9]),
})

# Eligibility rule (ground truth logic)
data["eligible"] = (
    (data["owns_land"] == 1) &
    (data["is_farmer"] == 1) &
    (data["annual_income"] <= 150000)
).astype(int)

X = data.drop("eligible", axis=1)
y = data["eligible"]

# ---------- PIPELINE ----------
pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", LogisticRegression())
])

pipeline.fit(X, y)

# ---------- SAVE MODEL ----------
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "pipeline.pkl"

joblib.dump(pipeline, MODEL_PATH)

print("✅ PM-KISAN pipeline saved at:", MODEL_PATH)
print("📦 File size (bytes):", MODEL_PATH.stat().st_size)
