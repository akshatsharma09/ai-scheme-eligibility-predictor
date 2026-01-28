import joblib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent


def load_pipeline(scheme_name: str):
    """
    Load full ML pipeline for a scheme.
    """
    scheme_dir = BASE_DIR / scheme_name
    pipeline_path = scheme_dir / "pipeline.pkl"

    if not pipeline_path.exists():
        raise FileNotFoundError(f"Pipeline not found for scheme: {scheme_name}")

    return joblib.load(pipeline_path)


# Load pipelines once at startup
PIPELINES = {
    "pm_kisan": load_pipeline("pm_kisan"),
    # future schemes will go here
}
