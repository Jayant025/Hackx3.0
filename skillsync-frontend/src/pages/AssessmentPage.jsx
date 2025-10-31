// src/pages/AssessmentPage.jsx
import { useState } from 'preact/hooks';
import {
  ChevronRight, ChevronLeft, Check, Brain, Trophy, Code, Users, Palette, Calculator, MessageSquare
} from 'lucide-react';
import { route } from 'preact-router';

function AssessmentPage({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    branch: '',
    branchOther: '',
    major: '',
    gpa: '',
    year: '',
    projectsCompleted: '',
    achievements: '',
    skills: [],
    logicPuzzles: 3,
    teamLeadership: 3,
    creativeDesign: 3,
    dataAnalysis: 3,
    communication: 3,
    problemSolving: 3,
    learningStyle: '',
    weeklyCommitment: '',
    careerGoal: '',
    preferredIndustries: []
  });

  const allowedBranches = [
    'Computer Science (CSE)',
    'Information Technology (IT)',
    'Artificial Intelligence & ML (AIML)',
    'Data Science',
    'Electronics & Communication (ECE)',
    'Electrical (EEE)',
    'Mechanical (ME)',
    'Civil (CE)',
    'Biotechnology',
    'Business/Management',
    'Other'
  ];

  const totalSteps = 3;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const currentArray = formData[name] || [];
      const updated = checked
        ? [...currentArray, value]
        : currentArray.filter((v) => v !== value);
      setFormData({ ...formData, [name]: updated });
    } else if (type === 'range') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBranchOtherInput = (e) => {
    const clean = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setFormData({ ...formData, branchOther: clean });
  };

  const validateStep = (step) => {
    if (step === 1) {
      if (!formData.branch) return 'Please select your branch.';
      if (formData.branch === 'Other' && !formData.branchOther.trim()) {
        return 'Please type your branch name (letters and spaces only).';
      }
      if (!formData.year) return 'Please select your current year of study.';
      if (formData.gpa === '' || isNaN(Number(formData.gpa))) return 'Please enter a valid GPA.';
      if (Number(formData.gpa) < 0) return 'GPA cannot be negative.';
      if (formData.projectsCompleted === '' || isNaN(Number(formData.projectsCompleted))) {
        return 'Please enter the number of projects completed.';
      }
      if (Number(formData.projectsCompleted) < 0) return 'Projects completed cannot be negative.';
    } else if (step === 3) {
      if (!formData.learningStyle) return 'Please choose your preferred learning style.';
      if (!formData.weeklyCommitment) return 'Please select your weekly time commitment.';
      if (!formData.careerGoal.trim()) return 'Please describe your primary career goal.';
    }
    return '';
  };

  const handleNext = () => {
    const msg = validateStep(currentStep);
    if (msg) {
      setError(msg);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setError('');
    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setError('');
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    const msg = validateStep(3);
    if (msg) {
      setError(msg);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setError('');

    const finalPayload = {
      ...formData,
      branch: formData.branch === 'Other' ? formData.branchOther.trim() : formData.branch,
    };

    try {
      localStorage.setItem('assessmentData', JSON.stringify(finalPayload));
    } catch {}

    if (typeof onComplete === 'function') {
      onComplete(finalPayload);
    } else {
      route('/pathways');
    }
  };

  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  const renderStep1 = () => (
    <>
      <div className="text-center mb-4">
        <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10" style={{ width: 64, height: 64 }}>
          <Code className="text-primary" size={28} />
        </div>
        <h2 className="mt-3 fw-bold">Academic Profile</h2>
        <p className="text-muted">Tell us about your educational background</p>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Branch *</label>
          <select
            name="branch"
            value={formData.branch}
            onInput={handleInputChange}
            className="form-select"
          >
            <option value="">Select branch</option>
            {allowedBranches.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {formData.branch === 'Other' && (
          <div className="col-md-6">
            <label className="form-label">Type Your Branch (letters & spaces only) *</label>
            <input
              type="text"
              name="branchOther"
              value={formData.branchOther}
              onInput={handleBranchOtherInput}
              className="form-control"
              placeholder="e.g., Computational Biology"
            />
          </div>
        )}

        <div className="col-md-6">
          <label className="form-label">Major / Field of Study (optional)</label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onInput={handleInputChange}
            className="form-control"
            placeholder="e.g., Computer Science, Business Analytics"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Current Year of Study *</label>
          <select
            name="year"
            value={formData.year}
            onInput={handleInputChange}
            className="form-select"
          >
            <option value="">Select year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
            <option value="graduate">Graduate</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Cumulative GPA / Grade *</label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="gpa"
            value={formData.gpa}
            onInput={handleInputChange}
            className="form-control"
            placeholder="e.g., 8.5 or 3.5"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Projects Completed *</label>
          <input
            type="number"
            min="0"
            name="projectsCompleted"
            value={formData.projectsCompleted}
            onInput={handleInputChange}
            className="form-control"
            placeholder="Number of major projects"
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="form-label">Key Skills & Technologies</label>
        <p className="text-muted small mb-2">Select all that apply</p>
        <div className="row row-cols-2 row-cols-md-3 g-2">
          {['Python', 'Java', 'SQL', 'JavaScript', 'Machine Learning', 'Data Analysis', 'Web Development', 'UI/UX Design', 'Cloud Computing'].map((skill) => (
            <div className="col" key={skill}>
              <div className="form-check border rounded p-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`skill-${skill}`}
                  name="skills"
                  value={skill}
                  checked={formData.skills?.includes(skill)}
                  onChange={handleInputChange}
                />
                <label className="form-check-label ms-1" htmlFor={`skill-${skill}`}>
                  {skill}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <label className="form-label">Key Achievements & Accomplishments</label>
        <textarea
          name="achievements"
          value={formData.achievements}
          onInput={handleInputChange}
          rows={3}
          className="form-control"
          placeholder="e.g., Dean's List, Hackathon winner, Research publications, Certifications, Leadership roles..."
        />
      </div>
    </>
  );

  const renderStep2 = () => {
    const interests = [
      { id: 'logicPuzzles', label: 'Solving complex logic puzzles and algorithms', icon: Brain },
      { id: 'dataAnalysis', label: 'Analyzing data patterns and deriving insights', icon: Calculator },
      { id: 'teamLeadership', label: 'Leading teams and coordinating group projects', icon: Users },
      { id: 'communication', label: 'Presenting ideas and communicating with stakeholders', icon: MessageSquare },
      { id: 'creativeDesign', label: 'Designing interfaces or creating visual content', icon: Palette },
      { id: 'problemSolving', label: 'Debugging issues and finding innovative solutions', icon: Trophy }
    ];

    return (
      <>
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-secondary bg-opacity-10" style={{ width: 64, height: 64 }}>
            <Brain className="text-secondary" size={28} />
          </div>
          <h2 className="mt-3 fw-bold">Interest & Aptitude</h2>
          <p className="text-muted">Rate your interest (1 = Low, 5 = High)</p>
        </div>

        <div className="d-flex flex-column gap-3">
          {interests.map(({ id, label, icon: Icon }) => (
            <div key={id} className="card">
              <div className="card-body">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 rounded bg-primary bg-opacity-10">
                    <Icon className="text-primary" size={20} />
                  </div>
                  <div className="flex-fill">
                    <label className="fw-semibold mb-2">{label}</label>
                    <div className="d-flex align-items-center gap-3">
                      <input
                        type="range"
                        name={id}
                        min="1"
                        max="5"
                        value={formData[id]}
                        onInput={handleInputChange}
                        className="form-range"
                        style={{ maxWidth: 400 }}
                      />
                      <span className="h4 mb-0 text-primary">{formData[id]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderStep3 = () => (
    <>
      <div className="text-center mb-4">
        <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10" style={{ width: 64, height: 64 }}>
          <Trophy className="text-success" size={28} />
        </div>
        <h2 className="mt-3 fw-bold">Learning Preferences & Goals</h2>
        <p className="text-muted">Help us personalize your learning journey</p>
      </div>

      <div className="row g-3">
        <div className="col-12">
          <label className="form-label">Preferred Learning Style *</label>
          <div className="row g-2">
            {[
              { value: 'visual', label: '👁 Visual (Videos, Diagrams)' },
              { value: 'hands-on', label: '🛠 Hands-on (Projects, Labs)' },
              { value: 'reading', label: '📚 Reading (Documentation, Articles)' },
              { value: 'interactive', label: '💬 Interactive (Workshops, Discussions)' }
            ].map((style) => (
              <div className="col-md-6" key={style.value}>
                <div className={`form-check border rounded p-3 ${formData.learningStyle === style.value ? 'border-primary' : 'border-secondary'}`}>
                  <input
                    className="form-check-input"
                    type="radio"
                    id={`ls-${style.value}`}
                    name="learningStyle"
                    value={style.value}
                    checked={formData.learningStyle === style.value}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label ms-2" htmlFor={`ls-${style.value}`}>
                    {style.label}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Weekly Time Commitment *</label>
          <select
            name="weeklyCommitment"
            value={formData.weeklyCommitment}
            onInput={handleInputChange}
            className="form-select"
          >
            <option value="">Select hours per week</option>
            <option value="5">5-10 hours/week</option>
            <option value="10">10-15 hours/week</option>
            <option value="15">15-20 hours/week</option>
            <option value="20">20+ hours/week</option>
          </select>
        </div>

        <div className="col-12">
          <label className="form-label">Primary Career Goal *</label>
          <textarea
            name="careerGoal"
            value={formData.careerGoal}
            onInput={handleInputChange}
            rows={3}
            className="form-control"
            placeholder="e.g., Become a Machine Learning Engineer at a tech company within 2 years"
          />
        </div>

        <div className="col-12">
          <label className="form-label">Preferred Industries</label>
          <p className="text-muted small mb-2">Select all that interest you</p>
          <div className="row row-cols-2 row-cols-md-3 g-2">
            {['Tech/Software', 'Finance/Banking', 'Healthcare', 'E-commerce', 'Consulting', 'Education', 'Gaming', 'Research', 'Startups'].map((industry) => (
              <div className="col" key={industry}>
                <div className="form-check border rounded p-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`ind-${industry}`}
                    name="preferredIndustries"
                    value={industry}
                    checked={formData.preferredIndustries?.includes(industry)}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label ms-1" htmlFor={`ind-${industry}`}>
                    {industry}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #ede9fe 50%, #fdf2f8 100%)' }}
    >
      <div className="container" style={{ maxWidth: 900 }}>
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h1 className="h3 fw-bold mb-0">Career Assessment</h1>
            <span className="small fw-semibold text-muted">Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="progress" style={{ height: 12 }}>
            <div
              className="progress-bar bg-primary"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercent}
            />
          </div>
        </div>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        <div className="card shadow">
          <div className="card-body p-4">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`btn ${currentStep === 1 ? 'btn-secondary disabled' : 'btn-outline-secondary'}`}
              >
                <ChevronLeft size={18} className="me-1" />
                Back
              </button>

              {currentStep < totalSteps ? (
                <button onClick={handleNext} className="btn btn-primary">
                  Next
                  <ChevronRight size={18} className="ms-1" />
                </button>
              ) : (
                <button onClick={handleSubmit} className="btn btn-success">
                  <Check size={18} className="me-1" />
                  Submit & Get Results
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-muted mt-3 small">
          🔒 Your data is secure and will be used only to generate personalized recommendations
        </p>
      </div>
    </div>
  );
}

export default AssessmentPage;