"""
Feature configuration for the Ayushman Bharat scheme.

This module keeps the feature space explicit and auditable:
- FEATURES are the non-sensitive inputs used for ML scoring.
- SENSITIVE_FEATURES are used only for fairness checks.
- EXCLUDED_FEATURES are deliberately left out for ethical reasons.
"""

from typing import Any, Mapping, Sequence, List


FEATURES: List[str] = [
    "age",
    "annual_income",
    "has_family_id",
]

SENSITIVE_FEATURES: List[str] = [
    "gender",
    "disability_status",
]

EXCLUDED_FEATURES: List[str] = [
    "caste",
    "religion",
    "political_affiliation",
]


def extract_model_features(payload: Mapping[str, Any]) -> Sequence[float]:
    """
    Extract ML-safe features from an Ayushman request payload.

    The resulting vector is intentionally independent of any
    sensitive attributes and can be passed directly into the
    Ayushman model for probability estimation.
    """
    return [
        float(payload.get("age", 0)),
        float(payload.get("annual_income", 0.0)),
        float(payload.get("has_family_id", 0)),
    ]


__all__ = [
    "FEATURES",
    "SENSITIVE_FEATURES",
    "EXCLUDED_FEATURES",
    "extract_model_features",
]

