import React from "react";

/**
 * FairnessPanel surfaces how the system thinks about bias,
 * without requiring judges to understand the backend code.
 *
 * It optionally renders a backend-provided fairness report if present.
 */
const FairnessPanel = ({ fairness, ethicalDisclaimer }) => {
  const status = fairness?.status;
  const explanation = fairness?.explanation;

  let badgeColor = "bg-slate-100 text-slate-800";
  if (status === "PASS") badgeColor = "bg-emerald-100 text-emerald-800";
  if (status === "WARN") badgeColor = "bg-amber-100 text-amber-800";
  if (status === "FAIL") badgeColor = "bg-red-100 text-red-800";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border mt-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Fairness & bias awareness
      </h2>
      <p className="text-sm text-gray-700 mb-3">
        Sensitive attributes (like gender) are never sent directly into the
        prediction models. They are only used in offline audits to compare how
        fairly approvals are distributed across groups.
      </p>

      {status && (
        <div className="mb-3">
          <span
            className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${badgeColor}`}
          >
            Fairness audit: {status}
          </span>
        </div>
      )}

      {explanation && (
        <p className="text-sm text-gray-700 mb-3">{explanation}</p>
      )}

      {!status && !explanation && (
        <p className="text-sm text-gray-600">
          This demo does not compute fairness metrics in the browser. The
          backend can produce a bias report (PASS / WARN / FAIL) based on group
          approval-rate differences, which would be shown here for judges.
        </p>
      )}

      <p className="text-xs text-gray-500 mt-4">
        {ethicalDisclaimer ||
          "This is a hackathon prototype only. It should not be used for real government decisions. Any detected bias must be reviewed by human policymakers before changes are made."}
      </p>
    </div>
  );
};

export default FairnessPanel;

