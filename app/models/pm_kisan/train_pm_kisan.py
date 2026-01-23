import numpy as np
import pandas as pd
import joblib
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression


def generate_pm_kisan_data(n_samples=3000):
    np.random.seed(42)

    ages = np.random.randint(18, 70, n_samples)
    incomes = np.random.randint(50000, 500000, n_samples)

    states = np.random.choice(
        ["Maharashtra", "UP", "Bihar", "Karnataka", "Tamil Nadu"],
        n_samples
    )

    genders = np.random.choice(["male", "female"], n_samples)

    occupations = np.random.choice(
        ["farmer", "student", "private_job", "government_job", "unemployed"],
        n_samples,
        p=[0.4, 0.15, 0.2, 0.15, 0.1]
    )

    eligible = []

    for age, income, occupation in zip(ages, incomes, occupations):
        is_eligible = (
            occupation == "farmer"
            and income <= 200000
            and age >= 18
        )

        # 8% noise
        if np.random.rand() < 0.08:
            is_eligible = not is_eligible

        eligible.append(int(is_eligible))

    return pd.DataFrame({
        "age": ages,
        "income": incomes,
        "state": states,
        "gender": genders,
        "occupation": occupations,
        "eligible": eligible
    })


def train_and_save_model():
    data = generate_pm_kisan_data()

    X = data.drop("eligible", axis=1)
    y = data["eligible"]

    categorical = ["state", "gender", "occupation"]
    numerical = ["age", "income"]

    preprocessor = ColumnTransformer(
        [
            ("num", StandardScaler(), numerical),
            ("cat", OneHotEncoder(handle_unknown="ignore"), categorical)
        ]
    )

    pipeline = Pipeline(
        [
            ("preprocessor", preprocessor),
            ("model", LogisticRegression(max_iter=1000))
        ]
    )

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    pipeline.fit(X_train, y_train)

    BASE_DIR = Path(__file__).resolve().parent

    joblib.dump(pipeline, BASE_DIR / "pipeline.pkl")

    print("✅ PM-KISAN pipeline saved successfully.")


if __name__ == "__main__":
    train_and_save_model()
