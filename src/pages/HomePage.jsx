import { useState } from 'react';

const HomePage = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    state: '',
    occupation: '',
    income: ''
  });
  const [results, setResults] = useState(null);

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
        eligible: true,
        probability: 85,
        benefit: '₹6,000 per year',
        reasons: [
          'Income falls within scheme threshold',
          'Age qualifies under priority group',
          'State-specific benefit applicable'
        ]
      },
      {
        name: 'Ayushman Bharat',
        eligible: true,
        probability: 70,
        benefit: 'Up to ₹5 lakh coverage',
        reasons: [
          'Income below eligibility limit',
          'State has active enrollment',
          'Occupation category eligible'
        ]
      },
      {
        name: 'Pradhan Mantri Awas Yojana',
        eligible: false,
        probability: 45,
        benefit: '₹2.5 lakh subsidy',
        reasons: [
          'Income slightly above threshold',
          'Existing housing status',
          'State allocation constraints'
        ]
      }
    ].sort((a, b) => b.probability - a.probability);
    setResults(mockResults);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Discover Government Schemes You Are Eligible For
          </h1>
          <p className="text-xl text-slate-700">
            Powered by Explainable AI for transparent and informed decisions.
          </p>
          <p className="text-sm text-slate-500 text-center mt-4">
            Your data is used only for eligibility calculation.
          </p>
          <div className="mt-8">
            <svg className="mx-auto h-24 w-24 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 3-Step Process */}
      <div className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Enter Your Details</h3>
              <p className="text-slate-700">Provide basic information for eligibility check</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Analyzes Eligibility</h3>
              <p className="text-slate-700">Our AI processes your data securely</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Get Schemes, Probability & Benefits</h3>
              <p className="text-slate-700">Receive personalized recommendations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Enter Your Details for Eligibility Check</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">Used only for eligibility calculation.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">Used only for eligibility calculation.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  required
                >
                  <option value="">Select State</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  {/* Add more states as needed */}
                </select>
                <p className="text-xs text-slate-500 mt-1">Used only for eligibility calculation.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">Occupation</label>
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  required
                >
                  <option value="">Select Occupation</option>
                  <option value="farmer">Farmer</option>
                  <option value="student">Student</option>
                  <option value="employee">Employee</option>
                  <option value="self-employed">Self-Employed</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">Used only for eligibility calculation.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">Annual Income (₹)</label>
                <input
                  type="number"
                  name="income"
                  value={formData.income}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">Used only for eligibility calculation.</p>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-3 px-4 rounded-md hover:bg-blue-900 transition-colors font-semibold"
              >
                Check Eligibility with AI
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Empty State Placeholder */}
      {!results && (
        <div className="py-12 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Your Eligibility Results Will Appear Here</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <ul className="space-y-2 mb-4">
                <li className="text-slate-700">Eligible government schemes</li>
                <li className="text-slate-700">Approval probability</li>
                <li className="text-slate-700">Expected benefit amount</li>
                <li className="text-slate-700">Clear AI-based explanations</li>
              </ul>
              <p className="text-slate-500 text-sm">Submit your details to see personalized results.</p>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {results && (
        <div className="py-12 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Eligible Schemes</h2>
            <div className="space-y-6">
              {results.map((scheme, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{scheme.name}</h3>
                      <p className="text-slate-700">{scheme.eligible ? '✅ Eligible' : '❌ Not Eligible'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Approval Probability</p>
                      <p className="text-2xl font-bold text-emerald-600">{scheme.probability}%</p>
                      <div className="w-32 bg-slate-200 rounded-full h-2 mt-1">
                        <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${scheme.probability}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-700 mb-4"><strong>Expected Benefit:</strong> {scheme.benefit}</p>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">Why did the AI recommend this?</h4>
                    <ul className="space-y-1">
                      {scheme.reasons.map((reason, idx) => (
                        <li key={idx} className="text-slate-700">• {reason}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
