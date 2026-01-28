import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { predictEligibility } from "../services/api";
import InputForm from "../components/InputForm";

const EligibilityForm = () => {
  const [language, setLanguage] = useState("en");
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    state: "",
    occupation: "",
    income: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const translations = {
    en: {
      title: "AI Scheme Eligibility & Impact Predictor",
      subtitle: "Helping citizens discover government schemes using AI",
      toggle: "हिंदी",
      formTitle: "Check Your Scheme Eligibility",
      age: "Age",
      income: "Annual Income (₹)",
      state: "State",
      gender: "Gender",
      occupation: "Occupation",
      button: "Check Eligible Schemes",
      helper: "No personal data is stored",
      male: "Male",
      female: "Female",
      other: "Other",
      selectGender: "Select Gender",
      selectState: "Select State",
      selectOccupation: "Select Occupation",
      farmer: "Farmer",
      student: "Student",
      employee: "Employee",
      selfEmployed: "Self-Employed",
    },
    hi: {
      title: "एआई योजना पात्रता और प्रभाव भविष्यवक्ता",
      subtitle: "नागरिकों को एआई का उपयोग करके सरकारी योजनाओं की खोज में मदद करना",
      toggle: "English",
      formTitle: "अपनी योजना पात्रता जांचें",
      age: "आयु",
      income: "वार्षिक आय (₹)",
      state: "राज्य",
      gender: "लिंग",
      occupation: "व्यवसाय",
      button: "पात्र योजनाएँ जांचें",
      helper: "कोई व्यक्तिगत डेटा संग्रहीत नहीं किया जाता",
      male: "पुरुष",
      female: "महिला",
      other: "अन्य",
      selectGender: "लिंग चुनें",
      selectState: "राज्य चुनें",
      selectOccupation: "व्यवसाय चुनें",
      farmer: "किसान",
      student: "विद्यार्थी",
      employee: "कर्मचारी",
      selfEmployed: "स्व-रोजगार",
    },
  };

  const t = translations[language];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        age: Number(formData.age),
        annual_income: Number(formData.income),
        gender: formData.gender,
        state: formData.state,
        occupation: formData.occupation,
        land_holding_acres: formData.occupation === "farmer" ? 1.5 : null,
      };

      const response = await predictEligibility(payload);
      const { schemes = [], fairness = null, ethical_disclaimer = "" } =
        response || {};

      navigate("/results", {
        state: {
          formData: payload,
          results: schemes,
          fairness,
          ethicalDisclaimer: ethical_disclaimer,
        },
      });
    } catch (err) {
      console.error("Error fetching backend predictions:", err);
      alert("Failed to contact the AI backend. Please ensure it is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-blue-50 py-6 border-b border-blue-200">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">{t.title}</h1>
            <p className="text-blue-700">{t.subtitle}</p>
            <p className="text-xs text-slate-600 mt-1">
              We use rule-based checks first, then an ML model only for
              probability—never to override policy rules.
            </p>
          </div>
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="text-blue-900 font-semibold hover:text-blue-700"
          >
            {t.toggle}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {t.formTitle}
            </h2>
            <InputForm
              t={t}
              formData={formData}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-dashed border-slate-300 text-sm text-slate-700">
            <h3 className="font-semibold mb-2">Fairness & privacy</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>We do not store your personal details.</li>
              <li>
                Sensitive fields (like gender) are monitored only to check for
                bias, not to boost or reduce your score.
              </li>
              <li>
                Eligibility is always decided by clear rules; AI just estimates
                probability.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityForm;
