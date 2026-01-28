import { useState } from "react";
import { useLocation } from "react-router-dom";
import PredictionCard from "../components/PredictionCard";
import ExplanationPanel from "../components/ExplanationPanel";
import FairnessPanel from "../components/FairnessPanel";

const ResultsPage = () => {
  const [language, setLanguage] = useState("en");
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { formData, results, fairness, ethicalDisclaimer } =
    location.state || {};

  const translations = {
    en: {
      title: "AI Scheme Eligibility & Impact Predictor",
      subtitle: "Helping citizens discover government schemes using AI",
      toggle: "हिंदी",
      resultsTitle: "Eligible Schemes",
      probability: "Approval Probability",
      benefit: "Expected Benefit",
      overallApproval: "Overall Approval Probability",
      totalBenefit: "Total Expected Benefit",
      schemesMatched: "Schemes Matched",
      viewDetails: "View Details & Apply",
      eligible: "Eligible",
      maxBenefit: "Maximum Benefit",
      yourBenefit: "Your Expected Benefit",
      documentsRequired: "Documents Required",
      applicationProcess: "Application Process",
      applyOfficial: "Apply on Official Portal",
      redirectText: "You will be redirected to the official government portal",
      whyPrediction: "Why This Prediction?",
      userProfile: "User Profile Summary",
      aiReasoning: "AI Reasoning",
    },
    hi: {
      title: "एआई योजना पात्रता और प्रभाव भविष्यवक्ता",
      subtitle: "नागरिकों को एआई का उपयोग करके सरकारी योजनाओं की खोज में मदद करना",
      toggle: "English",
      resultsTitle: "पात्र योजनाएँ",
      probability: "अनुमोदन संभावना",
      benefit: "अनुमानित लाभ",
      overallApproval: "कुल अनुमोदन संभावना",
      totalBenefit: "कुल अपेक्षित लाभ",
      schemesMatched: "मिलान योजनाएँ",
      viewDetails: "विवरण देखें और आवेदन करें",
      eligible: "पात्र",
      maxBenefit: "अधिकतम लाभ",
      yourBenefit: "आपका अपेक्षित लाभ",
      documentsRequired: "आवश्यक दस्तावेज",
      applicationProcess: "आवेदन प्रक्रिया",
      applyOfficial: "आधिकारिक पोर्टल पर आवेदन करें",
      redirectText: "आपको आधिकारिक सरकारी पोर्टल पर पुनर्निर्देशित किया जाएगा",
      whyPrediction: "यह भविष्यवाणी क्यों?",
      userProfile: "उपयोगकर्ता प्रोफ़ाइल सारांश",
      aiReasoning: "एआई तर्क",
    },
  };

  const t = translations[language];

  if (!results || !formData)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-700">
        No results found. Please start again from the eligibility form.
      </div>
    );

  const overallProbability = Math.round(
    results.reduce((sum, s) => sum + (s.approval_probability || 0), 0) /
      results.length
  );
  const totalBenefit = results.reduce(
    (sum, s) => sum + (s.expected_annual_benefit || 0),
    0
  );

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-blue-50 py-6 border-b border-blue-200">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">{t.title}</h1>
            <p className="text-blue-700">{t.subtitle}</p>
          </div>
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="text-blue-900 font-semibold hover:text-blue-700"
          >
            {t.toggle}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md border text-center">
          <h3 className="text-sm font-medium text-gray-500">{t.overallApproval}</h3>
          <p className="text-2xl font-bold text-blue-900">{overallProbability}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border text-center">
          <h3 className="text-sm font-medium text-gray-500">{t.totalBenefit}</h3>
          <p className="text-2xl font-bold text-green-600">₹{totalBenefit.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border text-center">
          <h3 className="text-sm font-medium text-gray-500">{t.schemesMatched}</h3>
          <p className="text-2xl font-bold text-gray-900">{results.length} of {results.length}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Scheme Cards */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {t.resultsTitle}
          </h2>
          <div className="space-y-4">
            {results.map((scheme, idx) => (
              <PredictionCard
                key={idx}
                scheme={scheme}
                t={t}
                onSelect={() => {
                  setSelectedScheme(scheme);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Explanation + Fairness */}
        <div className="flex flex-col">
          <ExplanationPanel t={t} formData={formData} results={results} />
          <FairnessPanel
            fairness={fairness}
            ethicalDisclaimer={ethicalDisclaimer}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
