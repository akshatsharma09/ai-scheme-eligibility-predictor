import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ResultsPage = () => {
  const [language, setLanguage] = useState('en');
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { formData, results } = location.state || {};

  const translations = {
    en: {
      title: 'AI Scheme Eligibility & Impact Predictor',
      subtitle: 'Helping citizens discover government schemes using AI',
      toggle: 'हिंदी',
      resultsTitle: 'Eligible Schemes',
      probability: 'Approval Probability',
      benefit: 'Expected Benefit',
      yearlyBenefit: 'Estimated yearly benefit',
      explainTitle: 'Why these schemes apply to you',
      male: 'Male',
      female: 'Female',
      other: 'Other',
      overallApproval: 'Overall Approval Probability',
      totalBenefit: 'Total Expected Benefit',
      schemesMatched: 'Schemes Matched',
      viewDetails: 'View Details & Apply',
      eligible: 'Eligible',
      maxBenefit: 'Maximum Benefit',
      yourBenefit: 'Your Expected Benefit',
      documentsRequired: 'Documents Required',
      applicationProcess: 'Application Process',
      applyOfficial: 'Apply on Official Portal',
      redirectText: 'You will be redirected to the official government portal',
      whyPrediction: 'Why This Prediction?',
      userProfile: 'User Profile Summary',
      aiReasoning: 'AI Reasoning'
    },
    hi: {
      title: 'एआई योजना पात्रता और प्रभाव भविष्यवक्ता',
      subtitle: 'नागरिकों को एआई का उपयोग करके सरकारी योजनाओं की खोज में मदद करना',
      toggle: 'English',
      resultsTitle: 'पात्र योजनाएँ',
      probability: 'अनुमोदन संभावना',
      benefit: 'अनुमानित लाभ',
      yearlyBenefit: 'अनुमानित वार्षिक लाभ',
      explainTitle: 'ये योजनाएँ आप पर क्यों लागू होती हैं',
      male: 'पुरुष',
      female: 'महिला',
      other: 'अन्य',
      overallApproval: 'कुल अनुमोदन संभावना',
      totalBenefit: 'कुल अपेक्षित लाभ',
      schemesMatched: 'मिलान योजनाएँ',
      viewDetails: 'विवरण देखें और आवेदन करें',
      eligible: 'पात्र',
      maxBenefit: 'अधिकतम लाभ',
      yourBenefit: 'आपका अपेक्षित लाभ',
      documentsRequired: 'आवश्यक दस्तावेज',
      applicationProcess: 'आवेदन प्रक्रिया',
      applyOfficial: 'आधिकारिक पोर्टल पर आवेदन करें',
      redirectText: 'आपको आधिकारिक सरकारी पोर्टल पर पुनर्निर्देशित किया जाएगा',
      whyPrediction: 'यह भविष्यवाणी क्यों?',
      userProfile: 'उपयोगकर्ता प्रोफ़ाइल सारांश',
      aiReasoning: 'एआई तर्क'
    }
  };

  const t = translations[language];

  useEffect(() => {
    if (!results) {
      // If no results, perhaps redirect back, but for now, assume it's there
    }
  }, [results]);

  if (!results || !formData) {
    return <div>Loading...</div>; // Or redirect
  }

  const eligibleSchemes = results.slice(0, 4);
  const overallProbability = Math.round(results.reduce((sum, s) => sum + s.probability, 0) / results.length);
  const totalBenefit = results.reduce((sum, s) => sum + s.benefit, 0);
  const schemesMatched = `${results.length} of 8`;

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
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="text-blue-900 font-semibold hover:text-blue-700"
          >
            {t.toggle}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 text-center">
            <h3 className="text-sm font-medium text-gray-500">{t.overallApproval}</h3>
            <p className="text-2xl font-bold text-blue-900">{overallProbability}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${overallProbability}%` }}></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 text-center">
            <h3 className="text-sm font-medium text-gray-500">{t.totalBenefit}</h3>
            <p className="text-2xl font-bold text-green-600">₹{totalBenefit.toLocaleString()}</p>
            <p className="text-xs text-gray-500">/ year</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 text-center">
            <h3 className="text-sm font-medium text-gray-500">{t.schemesMatched}</h3>
            <p className="text-2xl font-bold text-gray-900">{schemesMatched}</p>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Eligible Schemes List */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t.resultsTitle}</h2>
            <div className="space-y-4">
              {eligibleSchemes.map((scheme, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">{scheme.category}</span>
                    <span className="text-sm font-medium text-green-600">{t.eligible}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{scheme.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{scheme.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{t.probability}: {scheme.probability}%</span>
                    <span className="text-sm text-gray-500">₹{scheme.benefit.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedScheme(scheme);
                      setIsModalOpen(true);
                    }}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold"
                  >
                    {t.viewDetails}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Explainability Panel */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
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
                {results.flatMap(s => s.reasons).slice(0, 5).map((reason, idx) => (
                  <li key={idx}>• {reason}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedScheme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">{selectedScheme.name}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Scheme Overview */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Scheme Overview</h3>
              <p className="text-sm text-gray-600 mb-2">{selectedScheme.description}</p>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">{selectedScheme.category}</span>
                <span className="text-sm font-medium text-green-600">{t.eligible}</span>
              </div>
            </div>

            {/* Benefit Information */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Benefit Information</h3>
              <p className="text-sm text-gray-600 mb-1">{t.maxBenefit}: {selectedScheme.maxBenefit}</p>
              <p className="text-sm text-gray-600 mb-1 font-semibold">{t.yourBenefit}: ₹{selectedScheme.benefit.toLocaleString()}</p>
              <p className="text-sm text-gray-600">{t.probability}: {selectedScheme.probability}%</p>
            </div>

            {/* Documents Required */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.documentsRequired}</h3>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {selectedScheme.documents.map((doc, idx) => (
                  <li key={idx}>{doc}</li>
                ))}
              </ul>
            </div>

            {/* Application Process */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.applicationProcess}</h3>
              <ol className="list-decimal list-inside text-sm text-gray-700">
                {selectedScheme.process.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Apply Button */}
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 font-semibold">
              {t.applyOfficial}
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">{t.redirectText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
