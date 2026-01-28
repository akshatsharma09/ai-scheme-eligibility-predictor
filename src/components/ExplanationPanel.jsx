import React from "react";

const ExplanationPanel = ({ t, formData, results }) => {
  const allReasons =
    results
      ?.flatMap((s) => {
        if (!s.explanation) return [];
        // unified backend returns an object with rule + probability explanations
        if (typeof s.explanation === "object" && !Array.isArray(s.explanation)) {
          const { rule_based_reason, probability_explanation, overall_summary } =
            s.explanation;
          return [
            rule_based_reason,
            probability_explanation,
            overall_summary,
          ].filter(Boolean);
        }
        // fallback: treat as array of strings
        return s.explanation;
      })
      ?.filter(Boolean) || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{t.whyPrediction}</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t.userProfile}
        </h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>Age: {formData.age}</li>
          <li>Income: ₹{formData.income}</li>
          <li>Gender: {formData.gender}</li>
          <li>State: {formData.state}</li>
          <li>Occupation: {formData.occupation}</li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t.aiReasoning}
        </h3>
        {allReasons.length === 0 ? (
          <p className="text-sm text-gray-600">
            The backend did not return detailed reasons for this run. In the
            full system, each scheme explains which rule-based checks passed
            and how the model interpreted similar cases.
          </p>
        ) : (
          <ul className="text-sm text-gray-700 space-y-1">
            {allReasons.map((reason, idx) => (
              <li key={idx}>• {reason}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExplanationPanel;

