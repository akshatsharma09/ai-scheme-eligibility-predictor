"""
Feature configuration for the National Scholarship Portal (NSP) scheme.

This module clearly separates:
- FEATURES used for ML scoring,
- SENSITIVE_FEATURES used only for fairness checks, and
- EXCLUDED_FEATURES which the system avoids entirely.
"""

from typing import Any, Mapping, Sequence, List


FEATURES: List[str] = [
    "age",
    "annual_income",
    "student_class",
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
    Extract non-sensitive features from an NSP request payload.

    The output of this function can be passed safely into the NSP
    ML model to obtain an approval probability.
    """
    return [
        float(payload.get("age", 0)),
        float(payload.get("annual_income", 0.0)),
        float(payload.get("student_class", 0)),
    ]


__all__ = [
    "FEATURES",
    "SENSITIVE_FEATURES",
    "EXCLUDED_FEATURES",
    "extract_model_features",
]

