// frontend/src/app.jsx
import { Router, route } from 'preact-router';
import { useState, useEffect } from 'preact/hooks';
import Header from './components/Header';
import AIChatbot from './components/AIChatbot'; // NEW
import './app.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import pages...
import Dashboard from './pages/Dashboard';
import AssessmentPage from './pages/AssessmentPage';
import PathwaysView from './pages/PathwaysView';
import PortfolioBuilder from './pages/PortfolioBuilder';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

export function App() {
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [assessmentData, setAssessmentData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('assessmentData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAssessmentData(parsed);
        setAssessmentComplete(true);
        if (window.location.pathname === '/') {
          route('/dashboard', true);
        }
      } catch {}
    }
  }, []);

  const handleAssessmentComplete = (data) => {
    setAssessmentData(data);
    setAssessmentComplete(true);
    try {
      localStorage.setItem('assessmentData', JSON.stringify(data));
    } catch {}
    route('/pathways');
  };

  return (
    <>
      <Header assessmentComplete={assessmentComplete} />
      <div className="container-fluid mt-4">
        <Router>
          <AssessmentPage path="/" onComplete={handleAssessmentComplete} />
          <Login path="/login" />
          <SignUp path="/signup" />
          <Dashboard path="/dashboard" assessmentData={assessmentData} assessmentComplete={assessmentComplete} />
          <PathwaysView path="/pathways" assessmentData={assessmentData} />
          <PortfolioBuilder path="/portfolio" />
          <NotFound default />
        </Router>
      </div>
      
      {/* AI Chatbot - Available on all pages */}
      <AIChatbot />
    </>
  );
}