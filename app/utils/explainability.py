"""
Human-readable explanation utilities for scheme decisions.

The explainability layer combines:
- rule-based eligibility reasoning, and
- model-based approval probabilities,
while always attaching an ethical disclaimer for transparency.
"""

from pathlib import Path
from typing import Any, Dict, Mapping
import json


def _metadata_path_for_scheme(scheme_id: str) -> Path:
    """Resolve the metadata.json path for a given scheme."""
    return (
        Path(__file__)
        .resolve()
        .parent.parent
        / "schemes"
        / scheme_id
        / "metadata.json"
    )


def load_scheme_metadata(scheme_id: str) -> Dict[str, Any]:
    """
    Load static metadata for a scheme.

    This keeps transparency information (description, benefit, fairness
    policy, ethical disclaimer) next to the deployed pipeline rather than
    hard-coding it into the service layer.
    """
    meta_path = _metadata_path_for_scheme(scheme_id)
    if not meta_path.exists():
        # Fail gracefully – services can still respond without rich metadata.
        return {}

    with meta_path.open("r", encoding="utf-8") as f:
        return json.load(f)


def probability_to_text(probability: float) -> str:
    """
    Convert a numeric probability into a simple verbal explanation.

    This is intentionally coarse-grained so non-technical judges can
    understand the output at a glance.
    """
    p = float(probability)
    if p < 0.3:
        return (
            f"The model estimates a LOW likelihood of approval (~{p:.2f}). "
            "This suggests that, among similar applicants in the training data, "
            "relatively few were approved."
        )
    if p < 0.7:
        return (
            f"The model estimates a MODERATE likelihood of approval (~{p:.2f}). "
            "The outcome is uncertain, and human review would be appropriate."
        )
    return (
        f"The model estimates a HIGH likelihood of approval (~{p:.2f}). "
        "Many similar applicants in the training data were approved."
    )


def build_explanation_payload(
    *,
    scheme_id: str,
    scheme_display_name: str,
    rule_eligible: bool,
    rule_reason: str,
    approval_probability: float,
) -> Dict[str, Any]:
    """
    Combine rule-based reasoning, model probability and metadata into
    a single explanation object suitable for API responses.

    This function does not perform any model inference itself; it simply
    assembles human-readable text around existing results.
    """
    metadata = load_scheme_metadata(scheme_id) or {}
    ethical_disclaimer = metadata.get(
        "ethical_disclaimer",
        (
            "This tool is a demonstration and must not be used for official "
            "government decisions. Outputs are approximate and based on "
            "simplified assumptions."
        ),
    )

    probability_explanation = probability_to_text(approval_probability)

    overall_summary = (
        f"According to the rule-based eligibility check for {scheme_display_name}, "
        f"the applicant is {'ELIGIBLE' if rule_eligible else 'NOT ELIGIBLE'}. "
        "The ML model then provides an estimated approval probability which should "
        "be treated as advisory, not authoritative."
    )

    return {
        "rule_based_reason": rule_reason,
        "probability_explanation": probability_explanation,
        "overall_summary": overall_summary,
        "ethical_disclaimer": ethical_disclaimer,
    }


__all__ = [
    "load_scheme_metadata",
    "probability_to_text",
    "build_explanation_payload",
]

