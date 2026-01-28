"""
Transparent, rule-based eligibility criteria for NSP.

The rules are intentionally simple so that judges can quickly
understand why a particular student is marked as eligible or not,
without needing to inspect any ML internals.
"""

from typing import Any, Mapping, Tuple


def evaluate_eligibility(payload: Mapping[str, Any]) -> Tuple[bool, str]:
    """
    Apply simplified NSP eligibility rules.

    Returns:
        eligible: True if the applicant passes all checks.
        reason:   Human-readable explanation string.
    """
    age = int(payload.get("age", 0))
    annual_income = float(payload.get("annual_income", 0.0))
    student_class = int(payload.get("student_class", 0))

    if age < 10:
        return False, "Ineligible: applicant must be at least 10 years old for this demo."

    if annual_income > 120_000:
        return (
            False,
            "Ineligible: annual income exceeds the simplified NSP limit of ₹1.2 lakh.",
        )

    if student_class not in (10, 12):
        return (
            False,
            "Ineligible: only class 10 and 12 students are considered in this simplified NSP demo.",
        )

    return True, (
        "Eligible by rule check: class and income are within the simplified NSP criteria."
    )


__all__ = ["evaluate_eligibility"]

