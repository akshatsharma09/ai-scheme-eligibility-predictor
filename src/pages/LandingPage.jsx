import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              AI Scheme Eligibility &amp; Impact Predictor
            </h1>
            <p className="text-xl text-slate-700 mb-4">
              D02-S02: Fairness-aware ML pipelines for trustworthy public
              benefits.
            </p>
            <p className="text-base text-slate-700 mb-6">
              We combine clear rule-based eligibility with a small ML model that
              only estimates approval probability. Sensitive attributes are kept
              out of the model and used only to monitor bias.
            </p>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span className="text-slate-700">
                  Transparent eligibility rules, readable in plain language.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span className="text-slate-700">
                  Probability is advisory only—humans and policy stay in
                  control.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span className="text-slate-700">
                  Fairness panel highlights potential bias instead of hiding it.
                </span>
              </li>
            </ul>
            <p className="text-xs text-slate-500">
              This is a hackathon prototype, not an official government
              decision system.
            </p>
          </div>

          {/* Right Section */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              2-minute demo flow
            </h2>
            <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1 mb-4">
              <li>Enter a simple citizen profile.</li>
              <li>See which schemes you are eligible for.</li>
              <li>Understand why the system decided that way.</li>
              <li>Review the fairness and ethical disclaimer.</li>
            </ol>
            <div className="flex justify-center mt-4">
              <Link
                to="/form"
                className="bg-blue-800 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-900 transition-colors"
              >
                Check Eligibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
