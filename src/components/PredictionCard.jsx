import React from "react";

const PredictionCard = ({ scheme, t, onSelect }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
          {scheme.category || "General"}
        </span>
        <span className="text-sm font-medium text-green-600">
          {t.eligible}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {scheme.scheme}
      </h3>
      {scheme.description && (
        <p className="text-sm text-gray-600 mb-2">{scheme.description}</p>
      )}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">
          {t.probability}: {scheme.approval_probability ?? 0}%
        </span>
        <span className="text-sm text-gray-500">
          ₹{Number(scheme.expected_annual_benefit || 0).toLocaleString()}
        </span>
      </div>
      <button
        onClick={onSelect}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold"
      >
        {t.viewDetails}
      </button>
    </div>
  );
};

export default PredictionCard;

