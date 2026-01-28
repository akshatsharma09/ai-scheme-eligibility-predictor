import React from "react";

const InputForm = ({ t, formData, onChange, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t.age}
        </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          min={0}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t.income}
        </label>
        <input
          type="number"
          name="income"
          value={formData.income}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          min={0}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t.state}
        </label>
        <select
          name="state"
          value={formData.state}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">{t.selectState}</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t.gender}
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">{t.selectGender}</option>
          <option value="male">{t.male}</option>
          <option value="female">{t.female}</option>
          <option value="other">{t.other}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t.occupation}
        </label>
        <select
          name="occupation"
          value={formData.occupation}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">{t.selectOccupation}</option>
          <option value="farmer">{t.farmer}</option>
          <option value="student">{t.student}</option>
          <option value="employee">{t.employee}</option>
          <option value="self_employed">{t.selfEmployed}</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold disabled:opacity-60"
      >
        {loading ? "Checking..." : t.button}
      </button>
      <p className="text-xs text-gray-500 text-center">{t.helper}</p>
    </form>
  );
};

export default InputForm;

