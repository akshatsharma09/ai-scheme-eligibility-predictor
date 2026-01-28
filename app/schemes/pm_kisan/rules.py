"""
Simple, policy-driven eligibility rules for PM-KISAN.

Eligibility here is **rule-based only** and intentionally
separate from any ML model. The ML model is used later
only to estimate approval probability for applications
that pass these rules.
"""

from typing import Any, Mapping, Tuple


def evaluate_eligibility(payload: Mapping[str, Any]) -> Tuple[bool, str]:
    """
    Evaluate PM-KISAN eligibility using transparent rules.

    Returns:
        eligible: True if the applicant passes all basic checks.
        reason:   Human-readable explanation that can be shown
                  directly to non-technical judges.
    """
    land_size = float(payload.get("land_size_acres", 0.0))
    annual_income = float(payload.get("annual_income", 0.0))
    owns_land = int(payload.get("owns_land", 0))
    is_farmer = int(payload.get("is_farmer", 0))

    # Basic rule checks aligned with a simplified view of PM-KISAN policy.
    if not is_farmer:
        return False, "Ineligible: applicant is not registered as a farmer."

    if not owns_land:
        return False, "Ineligible: applicant does not own cultivable agricultural land."

    if land_size <= 0:
        return False, "Ineligible: land size must be greater than zero acres."

    if annual_income > 150_000:
        return (
            False,
            "Ineligible: annual income exceeds the simplified PM-KISAN limit of ₹1.5 lakh.",
        )

    return True, (
        "Eligible by rule check: applicant is a farmer with cultivable land and "
        "income within the simplified PM-KISAN limit."
    )


__all__ = ["evaluate_eligibility"]

