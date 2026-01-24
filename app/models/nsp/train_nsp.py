import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
import joblib
from pathlib import Path

np.random.seed(42)
n = 500

data = pd.DataFrame({
    "age": np.random.randint(17, 25, n),
    "annual_income": np.random.uniform(10000, 200000, n),
    "student_class": np.random.choice([10, 12, 1], n, p=[0.4, 0.5, 0.1]),
})

data["eligible"] = (
    (data["annual_income"] <= 120000) &
    (data["student_class"].isin([10, 12]))
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
print("✅ NSP pipeline saved at:", MODEL_PATH)
print("📦 File size (bytes):", MODEL_PATH.stat().st_size)
