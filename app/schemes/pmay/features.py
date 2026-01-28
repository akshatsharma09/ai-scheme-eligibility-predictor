"""
Feature configuration for the PMAY housing scheme.

This module documents which request fields:
- are used by the ML model,
- are treated as sensitive for fairness checks, and
- are deliberately excluded for ethical reasons.

No training or prediction logic lives here.
"""

from typing import Any, Mapping, Sequence, List


FEATURES: List[str] = [
    "age",
    "annual_income",
    "is_laborer",
]

SENSITIVE_FEATURES: List[str] = [
    "gender",  # derived from the upstream is_female field
]

EXCLUDED_FEATURES: List[str] = [
    "caste",
    "religion",
    "political_affiliation",
]


def extract_model_features(payload: Mapping[str, Any]) -> Sequence[float]:
    """
    Extract numeric features for the PMAY probability model.

    Design constraints:
    - Sensitive attributes such as gender MUST NOT appear here.
    - Only the non-sensitive FEATURES above are converted.

    The service layer is responsible for mapping any request-specific
    fields (e.g. is_female) into this neutral feature space.
    """
    return [
        float(payload.get("age", 0)),
        float(payload.get("annual_income", 0.0)),
        float(payload.get("is_laborer", 0)),
    ]


__all__ = [
    "FEATURES",
    "SENSITIVE_FEATURES",
    "EXCLUDED_FEATURES",
    "extract_model_features",
]

