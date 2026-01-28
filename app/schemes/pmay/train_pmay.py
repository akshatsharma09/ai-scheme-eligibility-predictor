import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
import joblib
from pathlib import Path

np.random.seed(42)
n = 500

# ---------- SYNTHETIC DATA ----------
data = pd.DataFrame({
    "age": np.random.randint(18, 60, n),
    "annual_income": np.random.uniform(20000, 200000, n),
    "is_female": np.random.choice([0, 1], n),
    "is_laborer": np.random.choice([0, 1], n),
})

# Ground truth eligibility logic
data["eligible"] = (
    (data["annual_income"] <= 120000) &
    (data["is_female"] == 1)
).astype(int)

X = data.drop("eligible", axis=1)
y = data["eligible"]

# ---------- PIPELINE ----------
pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", LogisticRegression())
])

pipeline.fit(X, y)

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "pipeline.pkl"

joblib.dump(pipeline, MODEL_PATH)
print("✅ PMAY pipeline saved at:", MODEL_PATH)
print("📦 File size (bytes):", MODEL_PATH.stat().st_size)
