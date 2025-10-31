// src/pages/Dashboard.jsx
import { useState, useEffect } from 'preact/hooks';
import { Link } from 'preact-router/match';
import { route } from 'preact-router';
import PortfolioBuilder from '../pages/PortfolioBuilder';
import { dashboardService } from '../services/dashboardService';

function Dashboard({ assessmentData: propAssessmentData, assessmentComplete }) {
  const [userData, setUserData] = useState({
    name: "Student",
    topRole: "Data Analyst",
    matchScore: 75,
    nextSkill: "Python for Data Science",
    completionPercent: 25,
    weeklyGoal: 15,
    hoursCompleted: 8,
    totalProjects: 3,
    completedProjects: 1,
    badges: 5,
    streak: 7
  });

  const [skillsData, setSkillsData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [assessmentData, setAssessmentData] = useState(null);

  useEffect(() => {
    // Load assessment data from localStorage or props
    let data = propAssessmentData;
    
    if (!data) {
      try {
        const saved = localStorage.getItem('assessmentData');
        if (saved) {
          data = JSON.parse(saved);
        }
      } catch (error) {
        console.error('Error loading assessment data:', error);
      }
    }

    // If no assessment data found, redirect to assessment
    if (!data) {
      route('/', true);
      return;
    }

    setAssessmentData(data);

    // Calculate dynamic values
    const matchScore = dashboardService.calculateMatchScore(data);
    const topRole = dashboardService.determineCareerRole(data);
    const completionPercent = dashboardService.calculateCompletionPercent(data);
    const skills = dashboardService.mapUserSkills(data);
    const nextSkill = dashboardService.getNextSkill(data, skills);
    const { goal, completed } = dashboardService.getWeeklyHours(data);
    const generatedActivities = dashboardService.generateActivities(data);
    const generatedMilestones = dashboardService.generateMilestones(data);

    // Extract name from assessment if available
    const name = data.name || extractNameFromData(data) || "Student";

    // Calculate projects
    const totalProjects = parseInt(data.projectsCompleted) || 0;
    const completedProjects = Math.floor(totalProjects * 0.7); // 70% completed

    // Update state
    setUserData({
      name,
      topRole,
      matchScore,
      nextSkill,
      completionPercent,
      weeklyGoal: goal,
      hoursCompleted: completed,
      totalProjects: Math.max(totalProjects, 3),
      completedProjects: Math.max(completedProjects, 1),
      badges: Math.floor(completionPercent / 10), // 1 badge per 10%
      streak: Math.min(Math.floor(completionPercent / 5), 30) // Streak based on progress
    });

    setSkillsData(skills);
    setActivities(generatedActivities);
    setMilestones(generatedMilestones);

  }, [propAssessmentData]);

  // Helper to extract name from assessment data
  const extractNameFromData = (data) => {
    // You could add a name field to assessment, or derive from email/username
    return data.userName || data.studentName || null;
  };

  return (
    <div className="container-fluid py-4" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', minHeight: '100vh'}}>
      <div className="container">

        {/* Welcome Header */}
        <div className="mb-4">
          <h1 className="display-5 fw-bold text-dark mb-2">
            👋 Welcome Back, {userData.name}!
          </h1>
          <p className="lead text-secondary">
            Your journey to becoming a {userData.topRole} is {userData.completionPercent}% complete
          </p>
          
          {/* Show branch info if available */}
          {assessmentData?.branch && (
            <div className="alert alert-info d-inline-flex align-items-center gap-2 mt-2">
              <span>🎓</span>
              <span><strong>{assessmentData.branch}</strong> • Year {assessmentData.year}</span>
              <span className="mx-2">|</span>
              <span>GPA: <strong>{assessmentData.gpa}</strong></span>
            </div>
          )}
        </div>

        {/* Stats Cards Row */}
        <div className="row g-4 mb-4">
          
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow border-start border-4 border-primary">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="bg-primary bg-opacity-10 p-2 rounded">
                    <svg width="24" height="24" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                    </svg>
                  </div>
                  <span className="h2 fw-bold text-primary mb-0">{userData.matchScore}%</span>
                </div>
                <h6 className="text-secondary fw-semibold mb-1">Career Match Score</h6>
                <small className="text-muted">Strong alignment with {userData.topRole}</small>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow border-start border-4 border-success">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="bg-success bg-opacity-10 p-2 rounded">
                    <svg width="24" height="24" fill="currentColor" className="text-success" viewBox="0 0 16 16">
                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                    </svg>
                  </div>
                  <span className="h2 fw-bold text-success mb-0">{userData.hoursCompleted}/{userData.weeklyGoal}h</span>
                </div>
                <h6 className="text-secondary fw-semibold mb-1">Weekly Progress</h6>
                <small className="text-muted">{userData.weeklyGoal - userData.hoursCompleted}h remaining this week</small>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow border-start border-4 border-info">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="bg-info bg-opacity-10 p-2 rounded">
                    <svg width="24" height="24" fill="currentColor" className="text-info" viewBox="0 0 16 16">
                      <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                    </svg>
                  </div>
                  <span className="h2 fw-bold text-info mb-0">{userData.completedProjects}/{userData.totalProjects}</span>
                </div>
                <h6 className="text-secondary fw-semibold mb-1">Projects Complete</h6>
                <small className="text-muted">Keep building your portfolio</small>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow border-start border-4 border-warning">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="bg-warning bg-opacity-10 p-2 rounded">
                    <svg width="24" height="24" fill="currentColor" className="text-warning" viewBox="0 0 16 16">
                      <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/>
                      <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                    </svg>
                  </div>
                  <span className="h2 fw-bold text-warning mb-0">{userData.streak}</span>
                </div>
                <h6 className="text-secondary fw-semibold mb-1">Day Streak</h6>
                <small className="text-muted">{userData.badges} badges earned</small>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="row g-4 mb-4">
          
          {/* Left Column - Skills Progress */}
          <div className="col-lg-8">
            
            {/* Skills Chart */}
            <div className="card shadow border-0 mb-4">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4 className="fw-bold mb-1">Your Skill Development</h4>
                    <small className="text-muted">Based on your {userData.topRole} pathway</small>
                  </div>
                  <Link href="/pathways" className="btn btn-sm btn-outline-primary">View All →</Link>
                </div>

                {skillsData.length > 0 ? (
                  <div className="mb-3">
                    {skillsData.map((skill, idx) => (
                      <div key={idx} className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="fw-semibold">{skill.skill}</span>
                          <span className="fw-bold" style={{color: skill.color}}>{skill.progress}%</span>
                        </div>
                        <div className="progress" style={{height: 10}}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${skill.progress}%`, backgroundColor: skill.color }}
                            aria-valuenow={skill.progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="alert alert-warning">
                    Complete the assessment to see your personalized skill roadmap!
                  </div>
                )}

                <div className="alert alert-primary d-flex align-items-start mb-0">
                  <span className="me-3 fs-4">⭐</span>
                  <div>
                    <h6 className="fw-bold mb-1">Next Recommended Skill</h6>
                    <p className="mb-2 text-dark">{userData.nextSkill}</p>
                    <Link href="/pathways" className="btn btn-sm btn-primary">Start Learning →</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-3">Recent Activity</h4>
                <div className="list-group list-group-flush">
                  {activities.map((activity) => (
                    <div key={activity.id} className="list-group-item px-0 border-0 py-3">
                      <div className="d-flex align-items-start">
                        <span className="fs-3 me-3">{activity.icon}</span>
                        <div className="flex-fill">
                          <p className="fw-semibold mb-1">{activity.title}</p>
                          <small className="text-muted">{activity.time}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Info */}
          <div className="col-lg-4">
            
            {/* Career Match Card */}
            <div className="card shadow border-0 mb-4">
              <div className="card-body p-4 text-center">
                <h5 className="fw-bold mb-3">Career Fit Analysis</h5>
                <div className="position-relative d-inline-block mb-3">
                  <svg width="180" height="180" viewBox="0 0 180 180">
                    <circle cx="90" cy="90" r="70" fill="none" stroke="#e5e7eb" strokeWidth="20"/>
                    <circle
                      cx="90" cy="90" r="70"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="20"
                      strokeDasharray={`${2 * Math.PI * 70 * userData.matchScore / 100} ${2 * Math.PI * 70}`}
                      strokeLinecap="round"
                      transform="rotate(-90 90 90)"
                    />
                  </svg>
                  <div className="position-absolute top-50 start-50 translate-middle text-center">
                    <div className="h1 fw-bold text-success mb-0">{userData.matchScore}%</div>
                    <small className="text-muted">Match</small>
                  </div>
                </div>
                <p className="text-muted mb-3">You're a great fit for <strong>{userData.topRole}</strong></p>
                <Link href="/pathways" className="btn btn-primary w-100 py-2">View Full Pathway</Link>
              </div>
            </div>

            {/* Upcoming Milestones */}
            <div className="card shadow border-0 mb-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Upcoming Milestones</h5>
                <div className="d-flex flex-column gap-3">
                  {milestones.slice(0, 3).map((m) => (
                    <div
                      key={m.id}
                      className={`p-3 rounded border-start border-4 ${
                        m.priority === 'high' ? 'bg-danger bg-opacity-10 border-danger' :
                        m.priority === 'medium' ? 'bg-warning bg-opacity-10 border-warning' :
                        'bg-success bg-opacity-10 border-success'
                      }`}
                    >
                      <p className="fw-semibold mb-1 small">{m.title}</p>
                      <small className="text-muted">Due in {m.deadline}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Quick Actions</h5>
                <div className="d-grid gap-2">
                  <Link href="/pathways" className="btn btn-outline-primary text-start d-flex align-items-center p-3">
                    <span className="me-3 fs-4">🎯</span>
                    <div>
                      <div className="fw-semibold">View Learning Path</div>
                      <small className="text-muted">See your personalized roadmap</small>
                    </div>
                  </Link>
                  
                  <Link href="/portfolio" className="btn btn-outline-success text-start d-flex align-items-center p-3">
                    <span className="me-3 fs-4">📚</span>
                    <div>
                      <div className="fw-semibold">Start a Project</div>
                      <small className="text-muted">Build your portfolio</small>
                    </div>
                  </Link>
                  
                  <button className="btn btn-outline-warning text-start d-flex align-items-center p-3">
                    <span className="me-3 fs-4">🔄</span>
                    <div>
                      <div className="fw-semibold">Retake Assessment</div>
                      <small className="text-muted">Update your profile</small>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Builder Section */}
        <div className="row">
          <div className="col-12">
            <PortfolioBuilder careerRole={userData.topRole} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;