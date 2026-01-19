import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              AI Scheme Eligibility & Impact Predictor
            </h1>
            <p className="text-xl text-slate-700 mb-8">
              Empowering citizens with AI-driven insights for government scheme eligibility.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span className="text-slate-700">Instant eligibility detection</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span className="text-slate-700">Approval probability</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span className="text-slate-700">Explainable AI transparency</span>
              </li>
            </ul>
          </div>
          {/* Right Section */}
          <div>
            <div className="mb-6">
              <p className="text-slate-700 mb-3">AI checks your eligibility instantly</p>
              <p className="text-slate-700 mb-3">Predicts approval probability</p>
              <p className="text-slate-700 mb-3">Explains every recommendation clearly</p>
            </div>
            <div className="flex justify-center mt-8">
              <Link
                to="/home"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-900 transition-colors"
              >
                Start Eligibility Check
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
