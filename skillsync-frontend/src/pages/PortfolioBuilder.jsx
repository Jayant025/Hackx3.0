// src/pages/PortfolioBuilder.jsx
import { useState } from 'preact/hooks';
import { CheckCircle, Circle, AlertCircle, BookOpen, Code, FileText, Github, Linkedin, Globe, Plus, Trash2, Edit } from 'lucide-react';

function PortfolioBuilder() {
  const [activeSection, setActiveSection] = useState('roadmap');
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Sales Analytics Dashboard',
      description: 'Built an interactive dashboard analyzing regional sales trends',
      status: 'completed',
      technologies: ['Python', 'Pandas', 'Plotly'],
      githubUrl: 'https://github.com/username/sales-dashboard',
      liveUrl: ''
    }
  ]);

  const [roadmapSteps, setRoadmapSteps] = useState([
    { id: 1, phase: 'Foundation', task: 'Define your first Data Analyst project objective', details: 'Choose a public dataset from Kaggle or government sources. Define a clear business question you want to answer.', completed: true, resources: ['Kaggle Datasets', 'Data.gov', 'Project Ideas Guide'] },
    { id: 2, phase: 'Foundation', task: 'Complete data cleaning and preparation', details: 'Document your data manipulation process thoroughly using Pandas in a Jupyter Notebook.', completed: true, resources: ['Pandas Documentation', 'Data Cleaning Tutorial'] },
    { id: 3, phase: 'Analysis', task: 'Implement core analysis or model', details: 'Run statistical tests, create aggregations, or build your initial predictive model.', completed: false, resources: ['Statistical Methods Guide', 'Model Selection Tips'] },
    { id: 4, phase: 'Visualization', task: 'Create compelling visualizations', details: 'Use Matplotlib, Seaborn, or Plotly to create clear, informative charts. Tell a story with your data.', completed: false, resources: ['Visualization Best Practices', 'Color Theory for Data Viz'] },
    { id: 5, phase: 'Documentation', task: 'Write a comprehensive project report', details: 'Summarize your findings for a non-technical audience. Include methodology, insights, and recommendations.', completed: false, resources: ['Technical Writing Guide', 'Report Templates'] },
    { id: 6, phase: 'Publication', task: 'Publish code on GitHub with detailed README', details: 'Ensure your repository is clean, well-organized, and includes a detailed README with setup instructions.', completed: false, resources: ['GitHub Best Practices', 'README Template'] },
    { id: 7, phase: 'Publication', task: 'Create portfolio website or blog post', details: 'Showcase your project on a personal website, Medium, or LinkedIn article.', completed: false, resources: ['Portfolio Website Builders', 'Medium Publishing Guide'] }
  ]);

  const [profileData, setProfileData] = useState({
    name: 'Your Name',
    title: 'Aspiring Data Analyst',
    bio: 'Passionate about turning data into actionable insights...',
    github: '',
    linkedin: '',
    website: '',
    skills: ['Python', 'SQL', 'Data Visualization', 'Statistics']
  });

  const toggleStepComplete = (id) => {
    setRoadmapSteps(roadmapSteps.map(step => step.id === id ? { ...step, completed: !step.completed } : step));
  };

  const addProject = () => {
    setProjects(prev => [...prev, {
      id: Date.now(),
      title: 'New Project',
      description: 'Project description...',
      status: 'in-progress',
      technologies: [],
      githubUrl: '',
      liveUrl: ''
    }]);
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const completedSteps = roadmapSteps.filter(s => s.completed).length;
  const totalSteps = roadmapSteps.length;
  const completionPercent = Math.round((completedSteps / totalSteps) * 100);

  const phaseColors = {
    'Foundation': 'primary',
    'Analysis': 'secondary',
    'Visualization': 'danger',
    'Documentation': 'success',
    'Publication': 'warning'
  };

  const renderRoadmap = () => (
    <div className="d-flex flex-column gap-4">
      <div className="card text-white shadow" style={{background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)'}}>
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
            <div>
              <h3 className="fw-bold mb-1">Portfolio Progress</h3>
              <p className="mb-0" style={{opacity: 0.9}}>Follow this roadmap to build employer-ready projects</p>
            </div>
            <div className="text-md-end mt-3 mt-md-0">
              <div className="display-6 fw-bold">{completionPercent}%</div>
              <div className="small" style={{opacity: 0.9}}>{completedSteps}/{totalSteps} completed</div>
            </div>
          </div>
          <div className="progress bg-white bg-opacity-25" style={{height: '16px'}}>
            <div className="progress-bar bg-white" style={{width: `${completionPercent}%`}} />
          </div>
        </div>
      </div>

      <div className="card shadow">
        <div className="card-body p-4">
          <h4 className="fw-bold mb-4">Project Development Roadmap</h4>
          <div className="d-flex flex-column gap-3">
            {roadmapSteps.map((step, idx) => (
              <div
                key={step.id}
                className={`card border-2 ${step.completed ? 'border-success bg-success bg-opacity-10' : 'border-secondary'}`}
                style={{cursor: 'pointer'}}
                onClick={() => toggleStepComplete(step.id)}
              >
                <div className="card-body p-3">
                  <div className="d-flex align-items-start gap-3">
                    <div className="pt-1">
                      {step.completed ? <CheckCircle size={24} className="text-success" /> : <Circle size={24} className="text-secondary" />}
                    </div>

                    <div className="flex-fill">
                      <div className="d-flex align-items-center gap-3 mb-2">
                        <span className={`badge bg-${phaseColors[step.phase]} text-white`}>{step.phase}</span>
                        <h5 className={`mb-0 fw-bold ${step.completed ? 'text-muted text-decoration-line-through' : ''}`}>
                          Step {idx + 1}: {step.task}
                        </h5>
                      </div>

                      <p className="text-muted mb-3">{step.details}</p>

                      {step.resources.length > 0 && (
                        <div className="d-flex flex-wrap gap-2 align-items-center">
                          <span className="small fw-semibold text-muted">Resources:</span>
                          {step.resources.map((resource, ridx) => (
                            <button
                              key={ridx}
                              className="btn btn-sm btn-outline-primary"
                              onClick={(e) => e.stopPropagation()}
                            >
                              📚 {resource}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="alert alert-info border-2 d-flex align-items-start gap-3">
        <AlertCircle className="text-info shrink-0 mt-1" size={24} />
        <div>
          <h5 className="fw-bold text-info mb-2">💡 Pro Tips for Portfolio Success</h5>
          <ul className="mb-0 text-dark">
            <li>Focus on quality over quantity - 2-3 excellent projects beat 10 mediocre ones</li>
            <li>Explain your thought process in your documentation</li>
            <li>Make your code readable with clear comments and naming</li>
            <li>Use visualizations to tell a compelling story</li>
            <li>Quantify impact (e.g., “Reduced processing time by 40%”)</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="card shadow">
      <div className="card-body p-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
          <div>
            <h3 className="fw-bold mb-1">Your Projects</h3>
            <p className="text-muted mb-0">Showcase your best work to potential employers</p>
          </div>
        <button onClick={addProject} className="btn btn-primary d-flex align-items-center gap-2 mt-3 mt-md-0">
            <Plus size={20} />
            Add Project
          </button>
        </div>
        // Add to renderProjects() in PortfolioBuilder.jsx

<button 
  onClick={async () => {
    try {
      const data = localStorage.getItem('assessmentData');
      if (data) {
        const parsed = JSON.parse(data);
        const ideas = await aiService.getProjectIdeas(
          'Data Analyst', // or dynamically from user data
          parsed.skills || [],
          'intermediate'
        );
        console.log('AI Project Ideas:', ideas);
        // Display in a modal or update state
      }
    } catch (error) {
      alert('AI service unavailable');
    }
  }}
  className="btn btn-success"
>
  🤖 Generate AI Project Ideas
</button>
        <div className="d-flex flex-column gap-3">
          {projects.map((project) => (
            <div key={project.id} className="card border-2">
              <div className="card-body p-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3">
                  <div className="flex-fill mb-3 mb-md-0">
                    <h5 className="fw-bold mb-2">{project.title}</h5>
                    <p className="text-muted mb-3">{project.description}</p>

                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="badge text-white fw-semibold" style={{backgroundColor: '#7c3aed'}}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-muted d-flex align-items-center gap-2 small">
                          <Github size={16} />
                          View Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-primary d-flex align-items-center gap-2 small">
                          <Globe size={16} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-secondary">
                      <Edit size={20} />
                    </button>
                    <button onClick={() => deleteProject(project.id)} className="btn btn-sm btn-outline-danger">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-top">
                  <span className={`badge ${
                    project.status === 'completed' ? 'bg-success' :
                    project.status === 'in-progress' ? 'bg-primary' : 'bg-secondary'
                  } text-white d-inline-flex align-items-center gap-2`}>
                    {project.status === 'completed' ? <CheckCircle size={16} /> : <Circle size={16} />}
                    {project.status === 'completed' ? 'Completed' :
                     project.status === 'in-progress' ? 'In Progress' : 'Planning'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="d-flex flex-column gap-4">
      <div className="card shadow">
        <div className="card-body p-4">
          <h3 className="fw-bold mb-4">Professional Profile</h3>

          <div className="d-flex flex-column gap-3">
            <div>
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onInput={(e) => setProfileData({...profileData, name: e.target.value})}
                className="form-control form-control-lg"
              />
            </div>

            <div>
              <label className="form-label fw-semibold">Professional Title</label>
              <input
                type="text"
                value={profileData.title}
                onInput={(e) => setProfileData({...profileData, title: e.target.value})}
                className="form-control form-control-lg"
              />
            </div>

            <div>
              <label className="form-label fw-semibold">Professional Bio</label>
              <textarea
                value={profileData.bio}
                onInput={(e) => setProfileData({...profileData, bio: e.target.value})}
                rows="4"
                className="form-control form-control-lg"
              />
            </div>

            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-semibold d-flex align-items-center gap-2"><Github size={16} /> GitHub</label>
                <input
                  type="text"
                  value={profileData.github}
                  onInput={(e) => setProfileData({...profileData, github: e.target.value})}
                  placeholder="github.com/username"
                  className="form-control"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold d-flex align-items-center gap-2"><Linkedin size={16} /> LinkedIn</label>
                <input
                  type="text"
                  value={profileData.linkedin}
                  onInput={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                  placeholder="linkedin.com/in/username"
                  className="form-control"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold d-flex align-items-center gap-2"><Globe size={16} /> Website</label>
                <input
                  type="text"
                  value={profileData.website}
                  onInput={(e) => setProfileData({...profileData, website: e.target.value})}
                  placeholder="yourwebsite.com"
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-top">
            <button className="btn btn-primary w-100 py-2">Save Profile</button>
          </div>
        </div>
      </div>

      <div className="card text-white shadow" style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'}}>
        <div className="card-body p-4">
          <h4 className="fw-bold mb-4">Portfolio Preview</h4>
          <div className="card bg-white bg-opacity-10 border-0">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-2">{profileData.name}</h3>
              <p className="fs-5 mb-3" style={{opacity: 0.9}}>{profileData.title}</p>
              <p className="mb-4" style={{opacity: 0.8}}>{profileData.bio}</p>
              <div className="d-flex gap-4">
                {profileData.github && <a href={profileData.github} className="text-white text-decoration-none d-flex align-items-center gap-2"><Github size={20} /> GitHub</a>}
                {profileData.linkedin && <a href={profileData.linkedin} className="text-white text-decoration-none d-flex align-items-center gap-2"><Linkedin size={20} /> LinkedIn</a>}
                {profileData.website && <a href={profileData.website} className="text-white text-decoration-none d-flex align-items-center gap-2"><Globe size={20} /> Website</a>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-vh-100 py-4" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
      <div className="container" style={{maxWidth: '1100px'}}>

        <div className="mb-4">
          <h1 className="display-6 fw-bold mb-2">✨ Portfolio Builder</h1>
          <p className="lead text-muted">Build an impressive portfolio that stands out to employers</p>
        </div>

        <div className="card shadow mb-4">
          <div className="card-body p-2">
            <div className="btn-group w-100" role="group">
              {[
                { id: 'roadmap', label: 'Project Roadmap', icon: BookOpen },
                { id: 'projects', label: 'My Projects', icon: Code },
                { id: 'profile', label: 'Profile Setup', icon: FileText }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`btn ${activeSection === tab.id ? 'btn-primary' : 'btn-outline-secondary'} d-flex align-items-center justify-content-center gap-2`}
                >
                  <tab.icon size={20} />
                  <span className="d-none d-md-inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          {activeSection === 'roadmap' && renderRoadmap()}
          {activeSection === 'projects' && renderProjects()}
          {activeSection === 'profile' && renderProfile()}
        </div>
      </div>
    </div>
  );
}

export default PortfolioBuilder;