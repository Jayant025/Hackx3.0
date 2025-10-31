// src/pages/PathwaysView.jsx
import { useState, useEffect, useMemo } from 'preact/hooks';
import { route } from 'preact-router';
import { TrendingUp, DollarSign, Briefcase, CheckCircle, Circle, Clock, BookOpen, ExternalLink, Star, Award, Target, Zap } from 'lucide-react';
import careerPathwayService from '../services/careerPathwayService';

function PathwaysView({ assessmentData: propAssessmentData }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [assessmentData, setAssessmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load assessment data on mount
  useEffect(() => {
    let data = propAssessmentData;
    
    if (!data) {
      try {
        const saved = localStorage.getItem('assessmentData');
        if (saved) {
          data = JSON.parse(saved);
        }
      } catch (error) {
        console.error('Error loading assessment:', error);
      }
    }

    if (!data) {
      // No assessment found, redirect to assessment page
      alert('Please complete the assessment first to see your personalized career pathway!');
      route('/', true);
      return;
    }

    setAssessmentData(data);
    setIsLoading(false);
  }, [propAssessmentData]);

  // Generate personalized career pathway
  const careerData = useMemo(() => {
    if (!assessmentData) return null;
    return careerPathwayService.getCareerPathway(assessmentData);
  }, [assessmentData]);

  // Get relevant courses
  const courses = useMemo(() => {
    if (!careerData) return [];
    return careerPathwayService.getRelevantCourses(careerData.role);
  }, [careerData]);

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} />
        <p className="mt-3 text-muted">Loading your personalized career pathway...</p>
      </div>
    );
  }

  if (!careerData) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">
          <h4>No pathway data available</h4>
          <p>Please complete the assessment to generate your career pathway.</p>
          <button onClick={() => route('/')} className="btn btn-primary">
            Go to Assessment
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'needs-improvement': return 'warning';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={20} className="text-success" />;
      case 'in-progress': return <Zap size={20} className="text-primary" />;
      default: return <Circle size={20} className="text-secondary" />;
    }
  };

  const renderOverview = () => (
    <div>
      {/* Career Summary Card */}
      <div className="card text-white shadow-lg mb-4" style={{background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'}}>
        <div className="card-body p-4 p-md-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
            <div className="mb-3 mb-md-0">
              <h2 className="display-6 fw-bold mb-3">{careerData.role}</h2>
              <p className="fs-5 mb-0" style={{opacity: 0.9}}>{careerData.description}</p>
            </div>
            <div className="card bg-white bg-opacity-25 text-center p-3 rounded" style={{minWidth: '120px'}}>
              <div className="display-6 fw-bold">{careerData.matchScore}%</div>
              <div className="small">Match Score</div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="row g-3">
            <div className="col-md-3 col-sm-6">
              <div className="card bg-white bg-opacity-10 border-0">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <DollarSign size={20} />
                    <span className="fw-semibold">Salary Range</span>
                  </div>
                  <div className="h5 fw-bold mb-0">{careerData.salary}</div>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="card bg-white bg-opacity-10 border-0">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <TrendingUp size={20} />
                    <span className="fw-semibold">Job Growth</span>
                  </div>
                  <div className="h5 fw-bold mb-0">{careerData.growth}</div>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="card bg-white bg-opacity-10 border-0">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Briefcase size={20} />
                    <span className="fw-semibold">Demand</span>
                  </div>
                  <div className="d-flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < careerData.demandScore ? "currentColor" : "none"} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="card bg-white bg-opacity-10 border-0">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Clock size={20} />
                    <span className="fw-semibold">Time to Role</span>
                  </div>
                  <div className="fw-bold">{careerData.averageTimeToJob}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Message */}
      <div className="alert alert-success border-2 border-success mb-4">
        <div className="d-flex align-items-start gap-3">
          <span className="fs-3">🎯</span>
          <div>
            <h5 className="fw-bold mb-2">Your Personalized Pathway</h5>
            <p className="mb-2">
              Based on your assessment, we've identified <strong>{careerData.role}</strong> as your best career match with a <strong>{careerData.matchScore}% compatibility score</strong>.
            </p>
            <p className="mb-0 small">
              <strong>Your Branch:</strong> {assessmentData.branch} | 
              <strong> Year:</strong> {assessmentData.year} | 
              <strong> Skills:</strong> {assessmentData.skills?.length || 0} acquired
            </p>
          </div>
        </div>
      </div>

      {/* Key Industries */}
      <div className="card shadow mb-4">
        <div className="card-body p-4">
          <h4 className="fw-bold mb-3">Top Industries Hiring</h4>
          <div className="d-flex flex-wrap gap-2">
            {careerData.industries.map((industry, idx) => (
              <span key={idx} className="badge bg-primary bg-opacity-10 text-primary fs-6 fw-semibold px-3 py-2">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="card shadow">
        <div className="card-body p-4">
          <h4 className="fw-bold mb-4">Your Learning Progress</h4>
          <div className="d-flex flex-column gap-3">
            {careerData.skillPathway.map((category) => {
              const totalSkills = category.skills.length;
              const completedSkills = category.skills.filter(s => s.status === 'completed' || s.status === 'in-progress').length;
              const categoryProgress = (completedSkills / totalSkills) * 100;

              return (
                <div key={category.id}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold">{category.category}</span>
                    <span className="text-muted small">{completedSkills}/{totalSkills} skills</span>
                  </div>
                  <div className="progress" style={{height: '12px'}}>
                    <div 
                      className="progress-bar bg-success"
                      style={{width: `${categoryProgress}%`}}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="d-flex flex-column gap-4">
      {careerData.skillPathway.map((category) => (
        <div key={category.id} className="card shadow">
          <div className="card-header text-white py-3" style={{background: 'linear-gradient(90deg, #334155 0%, #1e293b 100%)'}}>
            <h4 className="mb-0 fw-bold">{category.category} Skills</h4>
          </div>
          <div className="card-body p-4">
            <div className="d-flex flex-column gap-3">
              {category.skills.map((skill, idx) => (
                <div 
                  key={idx}
                  className={`card border-2 border-${getStatusColor(skill.status)} bg-${getStatusColor(skill.status)} bg-opacity-10`}
                  style={{cursor: 'pointer'}}
                  onClick={() => setSelectedSkill(skill)}
                >
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center gap-3">
                        {getStatusIcon(skill.status)}
                        <div>
                          <h5 className="mb-1 fw-bold">{skill.name}</h5>
                          <div className="d-flex align-items-center gap-3">
                            <span className={`badge bg-${skill.priority === 'high' ? 'danger' : skill.priority === 'medium' ? 'warning' : 'success'} text-white`}>
                              {skill.priority} priority
                            </span>
                            <span className="text-muted small d-flex align-items-center gap-1">
                              <Clock size={14} /> {skill.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="h4 fw-bold mb-0">{skill.progress}%</span>
                    </div>
                    
                    <div className="progress" style={{height: '8px'}}>
                      <div 
                        className={`progress-bar bg-${getStatusColor(skill.status)}`}
                        style={{width: `${skill.progress}%`}}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCourses = () => (
    <div className="card shadow">
      <div className="card-body p-4">
        <h3 className="fw-bold mb-2">Recommended Learning Resources</h3>
        <p className="text-muted mb-4">
          Curated courses for your <strong>{careerData.role}</strong> pathway
        </p>
        
        <div className="d-flex flex-column gap-3">
          {courses.map((course, idx) => (
            <div key={idx} className="card border">
              <div className="card-body p-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3">
                  <div className="flex-fill mb-3 mb-md-0">
                    <h5 className="fw-bold mb-1">{course.title}</h5>
                    <p className="text-muted small mb-2">{course.provider} • {course.platform}</p>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {course.skills.map((skill, sidx) => (
                        <span key={sidx} className="badge bg-primary bg-opacity-10 text-primary fw-semibold">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-md-end ms-md-3">
                    <div className="h5 text-success fw-bold mb-1">{course.price}</div>
                    <div className="d-flex align-items-center gap-1 text-warning small">
                      <Star size={14} fill="currentColor" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 pt-3 border-top">
                  <div className="d-flex align-items-center gap-3 text-muted small">
                    <span className="d-flex align-items-center gap-1">
                      <Clock size={14} /> {course.duration}
                    </span>
                    <span className={`badge ${course.level === 'Beginner' ? 'bg-success' : course.level === 'Intermediate' ? 'bg-primary' : 'bg-secondary'} text-white`}>
                      {course.level}
                    </span>
                  </div>
                  <a href="#" className="btn btn-primary d-flex align-items-center gap-2">
                    Enroll <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="card shadow">
      <div className="card-body p-4">
        <h3 className="fw-bold mb-2">Portfolio Projects for {careerData.role}</h3>
        <p className="text-muted mb-4">
          Build these projects to showcase your skills to employers
        </p>
        
        <div className="d-flex flex-column gap-4">
          {careerData.projects.map((project, idx) => (
            <div key={idx} className="card border-2 border-secondary">
              <div className="card-body p-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3">
                  <div className="flex-fill mb-3 mb-md-0">
                    <h5 className="fw-bold mb-2">{project.title}</h5>
                    <p className="text-muted mb-3">{project.description}</p>
                  </div>
                  <span className={`badge ${project.difficulty === 'Beginner' ? 'bg-success' : project.difficulty === 'Intermediate' ? 'bg-warning' : 'bg-danger'} text-white ms-md-3`}>
                    {project.difficulty}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="fw-semibold small mb-2">Skills Applied:</div>
                  <div className="d-flex flex-wrap gap-2">
                    {project.skills.map((skill, sidx) => (
                      <span key={sidx} className="badge bg-primary bg-opacity-10 text-primary fw-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="fw-semibold small mb-2">Deliverables:</div>
                  <div className="row g-2">
                    {project.deliverables.map((item, didx) => (
                      <div key={didx} className="col-md-4">
                        <div className="d-flex align-items-center gap-2 text-muted small">
                          <CheckCircle size={16} className="text-success" />
                          <span>{item}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 pt-3 border-top">
                  <span className="text-muted small d-flex align-items-center gap-1">
                    <Clock size={14} /> Estimated: {project.duration}
                  </span>
                  <button className="btn btn-primary">
                    Start Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-vh-100 py-4" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
      <div className="container" style={{maxWidth: '1200px'}}>
        
        {/* Header */}
        <div className="mb-4">
          <h1 className="display-6 fw-bold mb-2">🎯 Your Career Pathway</h1>
          <p className="lead text-muted">
            Personalized roadmap to becoming a <strong>{careerData.role}</strong>
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="card shadow mb-4">
          <div className="card-body p-2">
            <div className="btn-group w-100" role="group">
              {[
                { id: 'overview', label: 'Overview', icon: Target },
                { id: 'skills', label: 'Skill Roadmap', icon: Award },
                { id: 'courses', label: 'Courses', icon: BookOpen },
                { id: 'projects', label: 'Projects', icon: Briefcase }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-outline-secondary'} d-flex align-items-center justify-content-center gap-2`}
                >
                  <tab.icon size={20} />
                  <span className="d-none d-md-inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'skills' && renderSkills()}
          {activeTab === 'courses' && renderCourses()}
          {activeTab === 'projects' && renderProjects()}
        </div>
      </div>
    </div>
  );
}

export default PathwaysView;