import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EligibilityFormPage from './pages/EligibilityFormPage';
import ResultsPage from './pages/ResultsPage';
import ApiTestPage from "./pages/ApiTestPage";

<Route path="/api-test" element={<ApiTestPage />} />


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<EligibilityFormPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
