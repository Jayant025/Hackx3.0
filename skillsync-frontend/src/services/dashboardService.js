// src/services/dashboardService.js

export const dashboardService = {
  // Calculate career match score based on assessment
  calculateMatchScore(assessmentData) {
    if (!assessmentData) return 75; // Default
    
    let score = 0;
    let maxScore = 0;

    // GPA contribution (20 points max)
    const gpa = parseFloat(assessmentData.gpa);
    if (gpa) {
      maxScore += 20;
      if (gpa >= 8.5 || gpa >= 3.7) score += 20;
      else if (gpa >= 7.5 || gpa >= 3.0) score += 15;
      else if (gpa >= 6.5 || gpa >= 2.5) score += 10;
      else score += 5;
    }

    // Projects contribution (20 points max)
    const projects = parseInt(assessmentData.projectsCompleted) || 0;
    maxScore += 20;
    if (projects >= 5) score += 20;
    else if (projects >= 3) score += 15;
    else if (projects >= 1) score += 10;
    else score += 3;

    // Skills contribution (30 points max)
    const skills = assessmentData.skills || [];
    maxScore += 30;
    score += Math.min(skills.length * 3, 30);

    // Interest alignment (30 points max)
    maxScore += 30;
    const interests = [
      assessmentData.logicPuzzles,
      assessmentData.dataAnalysis,
      assessmentData.problemSolving,
      assessmentData.teamLeadership,
      assessmentData.communication
    ].filter(i => i !== undefined);
    
    const avgInterest = interests.reduce((a, b) => a + b, 0) / (interests.length || 1);
    score += (avgInterest / 5) * 30;

    return Math.min(Math.round((score / maxScore) * 100), 99);
  },

  // Determine top career role based on assessment
  determineCareerRole(assessmentData) {
    if (!assessmentData) return 'Data Analyst';

    const goal = (assessmentData.careerGoal || '').toLowerCase();
    const skills = assessmentData.skills || [];
    const interests = assessmentData;

    // Check career goal keywords
    if (goal.includes('machine learning') || goal.includes('ml') || goal.includes('ai')) {
      return 'Machine Learning Engineer';
    }
    if (goal.includes('data scientist')) {
      return 'Data Scientist';
    }
    if (goal.includes('full stack') || goal.includes('fullstack')) {
      return 'Full Stack Developer';
    }
    if (goal.includes('frontend') || goal.includes('front-end')) {
      return 'Frontend Developer';
    }
    if (goal.includes('backend') || goal.includes('back-end')) {
      return 'Backend Developer';
    }
    if (goal.includes('devops')) {
      return 'DevOps Engineer';
    }
    if (goal.includes('ui') || goal.includes('ux') || goal.includes('design')) {
      return 'UI/UX Designer';
    }
    if (goal.includes('product manager')) {
      return 'Product Manager';
    }

    // Fallback: determine by skills
    if (skills.includes('Machine Learning')) return 'Machine Learning Engineer';
    if (skills.includes('UI/UX Design')) return 'UI/UX Designer';
    if (skills.includes('Data Analysis') || skills.includes('SQL')) return 'Data Analyst';
    if (skills.includes('Web Development')) return 'Full Stack Developer';

    // Final fallback
    return 'Software Engineer';
  },

  // Calculate completion percentage
  calculateCompletionPercent(assessmentData) {
    if (!assessmentData) return 25;

    let completed = 0;
    const total = 100;

    // Assessment completed (20%)
    completed += 20;

    // Year contribution (20%)
    const year = assessmentData.year;
    if (year === 'graduate') completed += 20;
    else if (year === '4') completed += 16;
    else if (year === '3') completed += 12;
    else if (year === '2') completed += 8;
    else if (year === '1') completed += 4;

    // Projects (20%)
    const projects = parseInt(assessmentData.projectsCompleted) || 0;
    completed += Math.min(projects * 5, 20);

    // Skills (20%)
    const skills = assessmentData.skills || [];
    completed += Math.min(skills.length * 2.5, 20);

    // Achievements (10%)
    if (assessmentData.achievements?.trim()) completed += 10;

    // Learning style defined (10%)
    if (assessmentData.learningStyle) completed += 10;

    return Math.min(Math.round(completed), 95); // Cap at 95%
  },

  // Map user skills to progress data
  mapUserSkills(assessmentData) {
    if (!assessmentData) return this.getDefaultSkills();

    const userSkills = assessmentData.skills || [];
    const allPossibleSkills = [
      { skill: 'Python', color: '#3b82f6', category: 'programming' },
      { skill: 'Java', color: '#ef4444', category: 'programming' },
      { skill: 'JavaScript', color: '#f59e0b', category: 'programming' },
      { skill: 'SQL', color: '#10b981', category: 'database' },
      { skill: 'Machine Learning', color: '#8b5cf6', category: 'advanced' },
      { skill: 'Data Analysis', color: '#ec4899', category: 'analytics' },
      { skill: 'Web Development', color: '#06b6d4', category: 'web' },
      { skill: 'UI/UX Design', color: '#f43f5e', category: 'design' },
      { skill: 'Cloud Computing', color: '#14b8a6', category: 'cloud' }
    ];

    // Filter to only show user's selected skills
    const filteredSkills = allPossibleSkills.filter(s => 
      userSkills.some(us => us.toLowerCase().includes(s.skill.toLowerCase()) || 
                            s.skill.toLowerCase().includes(us.toLowerCase()))
    );

    // Calculate progress based on various factors
    const result = filteredSkills.map(skill => {
      let progress = 30; // Base progress for having the skill

      // Boost based on projects
      const projects = parseInt(assessmentData.projectsCompleted) || 0;
      progress += projects * 5;

      // Boost based on year
      const yearBoost = { '1': 5, '2': 10, '3': 15, '4': 20, 'graduate': 25 };
      progress += yearBoost[assessmentData.year] || 0;

      // Boost based on relevant interests
      if (skill.category === 'programming' && assessmentData.problemSolving >= 4) progress += 10;
      if (skill.category === 'analytics' && assessmentData.dataAnalysis >= 4) progress += 10;
      if (skill.category === 'design' && assessmentData.creativeDesign >= 4) progress += 10;

      return {
        ...skill,
        progress: Math.min(Math.round(progress), 90) // Cap at 90%
      };
    });

    // If no skills selected, show defaults
    return result.length > 0 ? result.slice(0, 5) : this.getDefaultSkills();
  },

  getDefaultSkills() {
    return [
      { skill: 'Python', progress: 45, color: '#3b82f6' },
      { skill: 'SQL', progress: 30, color: '#10b981' },
      { skill: 'Data Analysis', progress: 35, color: '#ec4899' }
    ];
  },

  // Get next recommended skill
  getNextSkill(assessmentData, userSkills) {
    if (!assessmentData) return 'Python Programming';

    const role = this.determineCareerRole(assessmentData);
    const hasSkills = assessmentData.skills || [];

    const recommendations = {
      'Machine Learning Engineer': ['Python', 'Machine Learning', 'Statistics', 'Deep Learning', 'MLOps'],
      'Data Scientist': ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization'],
      'Data Analyst': ['SQL', 'Python', 'Data Visualization', 'Excel', 'Statistics'],
      'Full Stack Developer': ['JavaScript', 'React', 'Node.js', 'SQL', 'APIs'],
      'Frontend Developer': ['JavaScript', 'React', 'CSS', 'UI/UX', 'TypeScript'],
      'Backend Developer': ['Node.js', 'Python', 'SQL', 'APIs', 'Docker'],
      'UI/UX Designer': ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'CSS'],
      'DevOps Engineer': ['Docker', 'Kubernetes', 'CI/CD', 'Cloud', 'Linux'],
      'Software Engineer': ['Data Structures', 'Algorithms', 'System Design', 'Git', 'Testing']
    };

    const suggested = recommendations[role] || recommendations['Software Engineer'];
    
    // Find first skill user doesn't have
    for (const skill of suggested) {
      if (!hasSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()))) {
        return skill;
      }
    }

    return suggested[0]; // Fallback
  },

  // Calculate weekly hours
  getWeeklyHours(assessmentData) {
    if (!assessmentData) return { goal: 15, completed: 8 };

    const commitment = parseInt(assessmentData.weeklyCommitment) || 10;
    const goal = commitment;
    
    // Simulate current progress (in real app, track this separately)
    const completed = Math.floor(goal * 0.6); // 60% progress

    return { goal, completed };
  },

  // Generate personalized activities
  generateActivities(assessmentData) {
    if (!assessmentData) return this.getDefaultActivities();

    const role = this.determineCareerRole(assessmentData);
    const skills = assessmentData.skills || [];
    const activities = [];

    // Assessment completion
    activities.push({
      id: 1,
      type: 'achievement',
      title: '🎉 Completed Career Assessment',
      time: 'Today',
      icon: '✅'
    });

    // Skill-based activities
    if (skills.includes('Python')) {
      activities.push({
        id: 2,
        type: 'progress',
        title: 'Started: Python for ' + role,
        time: '1 day ago',
        icon: '📚'
      });
    }

    if (skills.includes('Machine Learning')) {
      activities.push({
        id: 3,
        type: 'completed',
        title: 'Completed: ML Fundamentals Module',
        time: '2 days ago',
        icon: '🏆'
      });
    }

    // Branch-based activity
    if (assessmentData.branch) {
      activities.push({
        id: 4,
        type: 'info',
        title: `Enrolled in ${assessmentData.branch} program`,
        time: 'This semester',
        icon: '🎓'
      });
    }

    return activities.slice(0, 4);
  },

  getDefaultActivities() {
    return [
      { id: 1, type: 'completed', title: 'Completed: Python Basics Module', time: '2 hours ago', icon: '✅' },
      { id: 2, type: 'progress', title: 'Started: SQL Joins & Aggregations', time: '1 day ago', icon: '📚' },
      { id: 3, type: 'achievement', title: 'Earned: Problem Solver Badge', time: '2 days ago', icon: '🏆' },
      { id: 4, type: 'project', title: 'Published: Sales Analysis Dashboard', time: '3 days ago', icon: '🚀' }
    ];
  },

  // Generate personalized milestones
  generateMilestones(assessmentData) {
    if (!assessmentData) return this.getDefaultMilestones();

    const role = this.determineCareerRole(assessmentData);
    const nextSkill = this.getNextSkill(assessmentData);
    
    return [
      {
        id: 1,
        title: `Master ${nextSkill}`,
        deadline: '2 weeks',
        priority: 'high'
      },
      {
        id: 2,
        title: `Build First ${role} Project`,
        deadline: '1 month',
        priority: 'high'
      },
      {
        id: 3,
        title: 'Complete 3 Portfolio Projects',
        deadline: '2 months',
        priority: 'medium'
      },
      {
        id: 4,
        title: 'Connect with Industry Mentor',
        deadline: '3 months',
        priority: 'low'
      }
    ];
  },

  getDefaultMilestones() {
    return [
      { id: 1, title: 'Complete Python Fundamentals', deadline: '2 weeks', priority: 'high' },
      { id: 2, title: 'Build First Portfolio Project', deadline: '1 month', priority: 'medium' },
      { id: 3, title: 'Connect with Industry Mentor', deadline: '2 months', priority: 'low' }
    ];
  }
};