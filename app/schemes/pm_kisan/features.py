"""
Feature configuration for the PM-KISAN scheme.

This module is intentionally **free of any ML training code**.
It only documents which inputs are:
- used by the ML model,
- treated as sensitive for fairness checks, and
- deliberately excluded for ethical reasons.
"""

from typing import Any, Mapping, Sequence, List

# Non-sensitive features that the ML model is allowed to use
# for estimating approval probability.
FEATURES: List[str] = [
    "land_size_acres",
    "annual_income",
    "owns_land",
    "is_farmer",
]

# Inputs that are considered sensitive and must NEVER be used
# directly for prediction. They are only allowed in downstream
# fairness and bias audits.
SENSITIVE_FEATURES: List[str] = [
    "gender",
    "disability_status",
]

# Attributes that are explicitly excluded from this demo
# for ethical reasons. These are listed here for transparency
# even if they are not present in the current API.
EXCLUDED_FEATURES: List[str] = [
    "caste",
    "religion",
    "political_affiliation",
]


def extract_model_features(payload: Mapping[str, Any]) -> Sequence[float]:
    """
    Extract numeric model features from an incoming request payload.

    Critical design choice:
    - This function MUST NOT depend on any sensitive attribute.
    - The order of values returned here must match the order in FEATURES.

    This keeps the feature-processing logic transparent and easily
    auditable for judges and future contributors.
    """
    return [
        float(payload.get("land_size_acres", 0.0)),
        float(payload.get("annual_income", 0.0)),
        float(payload.get("owns_land", 0)),
        float(payload.get("is_farmer", 0)),
    ]


__all__ = [
    "FEATURES",
    "SENSITIVE_FEATURES",
    "EXCLUDED_FEATURES",
    "extract_model_features",
]

