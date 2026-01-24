import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { predictPmKisan, predictPmay, predictNsp, predictAyushman } from "../services/api";

const EligibilityFormPage = () => {
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

  const schemes = [
    {
      name: "PM-KISAN",
      apiCall: predictPmKisan,
      mapPayload: (data) => ({
        land_size_acres: 1.5,
        annual_income: Number(data.income),
        owns_land: data.occupation === "farmer" ? 1 : 0,
        is_farmer: data.occupation === "farmer" ? 1 : 0,
      }),
    },
    {
      name: "PMAY",
      apiCall: predictPmay,
      mapPayload: (data) => ({
        age: Number(data.age),
        annual_income: Number(data.income),
        is_female: data.gender === "female" ? 1 : 0,
        is_laborer: ["daily_wage_worker", "agricultural_labourer"].includes(data.occupation) ? 1 : 0,
      }),
    },
    {
      name: "NSP",
      apiCall: predictNsp,
      mapPayload: (data) => ({
        age: Number(data.age),
        annual_income: Number(data.income),
        student_class: data.occupation === "student" ? 12 : 10,
      }),
    },
    {
      name: "Ayushman Bharat",
      apiCall: predictAyushman,
      mapPayload: (data) => ({
        age: Number(data.age),
        annual_income: Number(data.income),
        has_family_id: 1,
      }),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const results = [];

      for (const scheme of schemes) {
        const payload = scheme.mapPayload(formData);
        const res = await scheme.apiCall(payload);
        if (res.eligible) {
          // normalize the response for frontend
          results.push({
            scheme: scheme.name,
            description: res.description || "",
            category: res.category || "General",
            approval_probability: res.approval_probability || 0,
            expected_annual_benefit: res.expected_annual_benefit || 0,
            documents: res.documents || [],
            process: res.process || [],
            explanation: res.explanation || [],
          });
        }
      }

      results.sort((a, b) => b.approval_probability - a.approval_probability);
      navigate("/results", { state: { formData, results } });
    } catch (err) {
      console.error("Error fetching backend predictions:", err);
      alert("Failed to fetch scheme predictions. Ensure backend is running.");
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t.formTitle}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.age}</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.income}</label>
                <input
                  type="number"
                  name="income"
                  value={formData.income}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.state}</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.gender}</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.occupation}</label>
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
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
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold"
              >
                {loading ? "Checking..." : t.button}
              </button>
              <p className="text-xs text-gray-500 text-center">{t.helper}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityFormPage;
