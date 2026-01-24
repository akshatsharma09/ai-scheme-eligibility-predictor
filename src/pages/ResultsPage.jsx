import { useState } from "react";
import { useLocation } from "react-router-dom";

const ResultsPage = () => {
  const [language, setLanguage] = useState("en");
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { formData, results } = location.state || {};

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

  if (!results || !formData) return <div>Loading...</div>;

  const overallProbability = Math.round(
    results.reduce((sum, s) => sum + s.approval_probability, 0) / results.length
  );
  const totalBenefit = results.reduce((sum, s) => sum + s.expected_annual_benefit, 0);

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
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t.resultsTitle}</h2>
          <div className="space-y-4">
            {results.map((scheme, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">{scheme.category}</span>
                  <span className="text-sm font-medium text-green-600">{t.eligible}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{scheme.scheme}</h3>
                <p className="text-sm text-gray-600 mb-2">{scheme.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{t.probability}: {scheme.approval_probability}%</span>
                  <span className="text-sm text-gray-500">₹{scheme.expected_annual_benefit.toLocaleString()}</span>
                </div>
                <button onClick={() => { setSelectedScheme(scheme); setIsModalOpen(true); }}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold">
                  {t.viewDetails}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Explanation Panel */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t.whyPrediction}</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.userProfile}</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Age: {formData.age}</li>
              <li>Income: ₹{formData.income}</li>
              <li>Gender: {formData.gender}</li>
              <li>State: {formData.state}</li>
              <li>Occupation: {formData.occupation}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.aiReasoning}</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              {results.flatMap((s) => s.explanation).map((reason, idx) => (
                <li key={idx}>• {reason}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
