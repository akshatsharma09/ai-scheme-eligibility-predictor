"""
Transparent, rule-based eligibility logic for Ayushman Bharat.

These rules are intentionally simplified but explicit so that
judges can quickly see why an applicant was marked eligible
or ineligible before any ML probability is considered.
"""

from typing import Any, Mapping, Tuple


def evaluate_eligibility(payload: Mapping[str, Any]) -> Tuple[bool, str]:
    """
    Apply simplified Ayushman eligibility rules.

    Returns:
        eligible: True if the applicant passes all checks.
        reason:   Human-readable explanation string.
    """
    age = int(payload.get("age", 0))
    annual_income = float(payload.get("annual_income", 0.0))
    has_family_id = int(payload.get("has_family_id", 0))

    if age <= 0:
        return False, "Ineligible: age must be a positive number."

    if annual_income > 120_000:
        return (
            False,
            "Ineligible: annual income exceeds the simplified Ayushman limit of ₹1.2 lakh.",
        )

    if not has_family_id:
        return (
            False,
            "Ineligible: applicant does not have a valid family ID in this demo.",
        )

    return True, (
        "Eligible by rule check: income is within limit and a valid family ID is present."
    )


__all__ = ["evaluate_eligibility"]

