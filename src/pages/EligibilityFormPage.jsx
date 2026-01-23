import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EligibilityFormPage = () => {
  const [language, setLanguage] = useState('en');
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    state: '',
    occupation: '',
    income: ''
  });
  const navigate = useNavigate();

  const translations = {
    en: {
      title: 'AI Scheme Eligibility & Impact Predictor',
      subtitle: 'Helping citizens discover government schemes using AI',
      toggle: 'हिंदी',
      formTitle: 'Check Your Scheme Eligibility',
      age: 'Age',
      income: 'Annual Income (₹)',
      state: 'State',
      gender: 'Gender',
      occupation: 'Occupation',
      button: 'Check Eligible Schemes',
      helper: 'No personal data is stored',
      male: 'Male',
      female: 'Female',
      other: 'Other',
      selectGender: 'Select Gender',
      selectState: 'Select State',
      selectOccupation: 'Select Occupation',
      farmer: 'Farmer',
      student: 'Student',
      employee: 'Employee',
      selfEmployed: 'Self-Employed'
    },
    hi: {
      title: 'एआई योजना पात्रता और प्रभाव भविष्यवक्ता',
      subtitle: 'नागरिकों को एआई का उपयोग करके सरकारी योजनाओं की खोज में मदद करना',
      toggle: 'English',
      formTitle: 'अपनी योजना पात्रता जांचें',
      age: 'आयु',
      income: 'वार्षिक आय (₹)',
      state: 'राज्य',
      gender: 'लिंग',
      occupation: 'व्यवसाय',
      button: 'पात्र योजनाएँ जांचें',
      helper: 'कोई व्यक्तिगत डेटा संग्रहीत नहीं किया जाता',
      male: 'पुरुष',
      female: 'महिला',
      other: 'अन्य',
      selectGender: 'लिंग चुनें',
      selectState: 'राज्य चुनें',
      selectOccupation: 'व्यवसाय चुनें',
      farmer: 'किसान',
      student: 'विद्यार्थी',
      employee: 'कर्मचारी',
      selfEmployed: 'स्व-रोजगार'
    }
  };

  const t = translations[language];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock AI prediction
    const mockResults = [
      {
        name: 'PM Kisan Samman Nidhi',
        category: 'Agriculture',
        description: 'Financial assistance to farmers for agricultural needs.',
        eligible: true,
        probability: 85,
        benefit: 6000,
        maxBenefit: '₹6,000',
        icon: '🌾',
        documents: ['Aadhaar Card', 'Ration Card', 'Income Certificate', 'Land Records'],
        process: ['Visit the official PM Kisan portal', 'Register with Aadhaar details', 'Verify bank account', 'Receive annual installments'],
        reasons: [
          'Income falls within eligible threshold',
          'Age group qualifies for relevant schemes',
          'State-specific policies considered',
          'Occupation mapped to agriculture category'
        ]
      },
      {
        name: 'Ayushman Bharat',
        category: 'Healthcare',
        description: 'Health insurance scheme for low-income families.',
        eligible: true,
        probability: 70,
        benefit: 500000,
        maxBenefit: '₹5 lakh',
        icon: '🏥',
        documents: ['Aadhaar Card', 'Ration Card', 'Income Certificate', 'Residence Proof'],
        process: ['Enroll through state health portal', 'Get Ayushman Bharat card', 'Visit empaneled hospitals', 'Avail cashless treatment'],
        reasons: [
          'Income falls within eligible threshold',
          'Age group qualifies for relevant schemes',
          'State-specific policies considered'
        ]
      },
      {
        name: 'Pradhan Mantri Awas Yojana',
        category: 'Housing',
        description: 'Subsidy for affordable housing for rural and urban poor.',
        eligible: true,
        probability: 60,
        benefit: 250000,
        maxBenefit: '₹2.5 lakh',
        icon: '🏠',
        documents: ['Aadhaar Card', 'Income Certificate', 'Residence Proof', 'Bank Account Details'],
        process: ['Apply through PMAY portal', 'Upload documents for verification', 'Get subsidy credit to account', 'Construct or purchase house'],
        reasons: [
          'Income falls within eligible threshold',
          'Age group qualifies for relevant schemes',
          'State-specific policies considered'
        ]
      },
      {
        name: 'Mid-Day Meal Scheme',
        category: 'Education',
        description: 'Nutritious meals for school children.',
        eligible: false,
        probability: 0,
        benefit: 0,
        maxBenefit: 'N/A',
        icon: '🍽️',
        documents: [],
        process: [],
        reasons: []
      }
    ].filter(s => s.eligible).sort((a, b) => b.probability - a.probability);
    navigate('/results', { state: { formData, results: mockResults } });
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
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="text-blue-900 font-semibold hover:text-blue-700"
          >
            {t.toggle}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Card: Input Form */}
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
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
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
                  <option value="student">{t.student}</option>
                  <option value="unemployed">{t.unemployed}</option>
                  <option value="salaried_private">{t.salaried_private}</option>
                  <option value="salaried_government">{t.salaried_government}</option>
                  <option value="self_employed">{t.self_employed}</option>
                  <option value="farmer">{t.farmer}</option>
                  <option value="agricultural_labourer">{t.agricultural_labourer}</option>
                  <option value="daily_wage_worker">{t.daily_wage_worker}</option>
                  <option value="business_owner">{t.business_owner}</option>
                  <option value="shopkeeper">{t.shopkeeper}</option>
                  <option value="skilled_worker">{t.skilled_worker}</option>
                  <option value="unskilled_worker">{t.unskilled_worker}</option>
                  <option value="it_professional">{t.it_professional}</option>
                  <option value="healthcare_worker">{t.healthcare_worker}</option>
                  <option value="teacher">{t.teacher}</option>
                  <option value="homemaker">{t.homemaker}</option>
                  <option value="retired">{t.retired}</option>
                  <option value="other">{t.other}</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold"
              >
                {t.button}
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
