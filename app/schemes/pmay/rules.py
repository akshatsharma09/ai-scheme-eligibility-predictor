"""
Simple, explainable eligibility rules for PMAY.

The goal is to keep this logic:
- transparent to non-technical judges,
- independent from any ML model, and
- easy to adjust if policy assumptions change.
"""

from typing import Any, Mapping, Tuple


def evaluate_eligibility(payload: Mapping[str, Any]) -> Tuple[bool, str]:
    """
    Evaluate PMAY eligibility using clear rule-based checks.

    Returns:
        eligible: True if the applicant satisfies all checks.
        reason:   Human-readable explanation.
    """
    age = int(payload.get("age", 0))
    annual_income = float(payload.get("annual_income", 0.0))
    is_laborer = int(payload.get("is_laborer", 0))

    if age < 18:
        return False, "Ineligible: applicant must be at least 18 years old."

    if annual_income > 120_000:
        return (
            False,
            "Ineligible: annual income exceeds the simplified PMAY limit of ₹1.2 lakh.",
        )

    if not is_laborer:
        return (
            True,
            "Eligible by rule check: income is within limit and applicant is not restricted by occupation.",
        )

    return True, (
        "Eligible by rule check: income is within limit and applicant is a labourer, "
        "which is prioritised in this simplified demo."
    )


__all__ = ["evaluate_eligibility"]

