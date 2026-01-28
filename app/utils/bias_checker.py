"""
Central fairness and bias auditing utilities.

Key design choices:
- No external fairness libraries are used.
- Sensitive attributes are NOT fed into the model; they are used
  only here, after predictions, to compare group-level behaviour.
- Outputs are intentionally simple: PASS / WARN / FAIL, with
  clear, human-readable explanations for hackathon judges.
"""

from dataclasses import dataclass
from typing import Any, Dict, Hashable, List, Mapping, Sequence, Tuple


@dataclass
class BiasReport:
    """
    Lightweight container for bias audit results.

    status:
        \"PASS\", \"WARN\" or \"FAIL\" depending on the largest
        approval-rate gap between groups.
    metric:
        Name of the fairness metric used (e.g. \"approval_rate_difference\").
    details:
        Raw numerical details per group so that judges can inspect
        the behaviour if needed.
    explanation:
        Short natural-language summary for non-technical audiences.
    """

    status: str
    metric: str
    details: Dict[str, Any]
    explanation: str


def _approval_rates_by_group(
    predictions: Sequence[int],
    sensitive_values: Sequence[Hashable],
) -> Dict[Hashable, float]:
    """Compute approval rates for each sensitive group."""
    group_counts: Dict[Hashable, int] = {}
    group_positives: Dict[Hashable, int] = {}

    for y, g in zip(predictions, sensitive_values):
        group_counts[g] = group_counts.get(g, 0) + 1
        if int(y) == 1:
            group_positives[g] = group_positives.get(g, 0) + 1

    rates: Dict[Hashable, float] = {}
    for g, n in group_counts.items():
        if n == 0:
            rates[g] = 0.0
        else:
            rates[g] = group_positives.get(g, 0) / n
    return rates


def run_bias_audit(
    predictions: Sequence[int],
    sensitive_values: Sequence[Hashable],
    allowed_diff: float = 0.10,
) -> BiasReport:
    """
    Compare model behaviour across sensitive groups.

    Args:
        predictions: Binary model outputs (0/1) or labels treated as approvals.
        sensitive_values: Group labels (e.g. \"male\"/\"female\") aligned
            position-wise with predictions.
        allowed_diff: Maximum tolerated gap in approval rates between
            any two groups before we raise a WARN/FAIL.

    Returns:
        BiasReport with PASS / WARN / FAIL and a compact explanation.
    """
    if not predictions or not sensitive_values or len(predictions) != len(
        sensitive_values
    ):
        return BiasReport(
            status="WARN",
            metric="approval_rate_difference",
            details={"reason": "insufficient_or_misaligned_data"},
            explanation=(
                "Fairness audit was not fully performed because there were not "
                "enough records or the sensitive attribute values did not align "
                "with the predictions."
            ),
        )

    rates = _approval_rates_by_group(predictions, sensitive_values)
    if len(rates) <= 1:
        return BiasReport(
            status="PASS",
            metric="approval_rate_difference",
            details={"group_rates": rates},
            explanation=(
                "Fairness audit passed trivially because only one group was present "
                "in the analysed data."
            ),
        )

    # Compute the largest absolute difference between any two groups.
    groups: List[Hashable] = list(rates.keys())
    max_gap: float = 0.0
    worst_pair: Tuple[Hashable, Hashable] = (groups[0], groups[0])

    for i in range(len(groups)):
        for j in range(i + 1, len(groups)):
            g1, g2 = groups[i], groups[j]
            gap = abs(rates[g1] - rates[g2])
            if gap > max_gap:
                max_gap = gap
                worst_pair = (g1, g2)

    # Interpret the gap in terms of thresholds.
    if max_gap <= allowed_diff:
        status = "PASS"
    elif max_gap <= allowed_diff * 1.5:
        status = "WARN"
    else:
        status = "FAIL"

    explanation = (
        f"Fairness audit result: {status}. The largest difference in approval "
        f"rates between any two groups was {max_gap:.2f}, observed between "
        f"groups {worst_pair[0]!r} and {worst_pair[1]!r}. "
        "Values above the configured threshold suggest the model may be "
        "treating groups unevenly and should be investigated."
    )

    return BiasReport(
        status=status,
        metric="approval_rate_difference",
        details={
            "group_rates": rates,
            "max_gap": max_gap,
            "worst_pair": [str(worst_pair[0]), str(worst_pair[1])],
            "allowed_diff": allowed_diff,
        },
        explanation=explanation,
    )


__all__ = ["BiasReport", "run_bias_audit"]

