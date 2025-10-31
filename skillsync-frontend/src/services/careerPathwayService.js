// frontend/src/services/careerPathwayService.js

export const careerPathwayService = {
  // Career database with detailed pathways
  careerDatabase: {
    'Machine Learning Engineer': {
      salary: '\$100,000 - \$180,000',
      growth: '+32%',
      demandScore: 5,
      industries: ['Tech/Software', 'Research', 'Healthcare', 'Finance/Banking', 'Autonomous Systems'],
      description: 'Build and deploy machine learning models and AI systems to solve complex real-world problems',
      averageTime: '12-18 months',
      requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'Data Analysis'],
      skillPathway: [
        {
          id: 1,
          category: 'Foundation',
          skills: [
            { name: 'Python Programming', duration: '6 weeks', priority: 'high' },
            { name: 'Mathematics for ML (Linear Algebra, Calculus)', duration: '8 weeks', priority: 'high' },
            { name: 'Statistics & Probability', duration: '6 weeks', priority: 'high' }
          ]
        },
        {
          id: 2,
          category: 'Core ML',
          skills: [
            { name: 'Supervised Learning Algorithms', duration: '8 weeks', priority: 'high' },
            { name: 'Unsupervised Learning & Clustering', duration: '6 weeks', priority: 'high' },
            { name: 'Neural Networks & Deep Learning', duration: '10 weeks', priority: 'high' }
          ]
        },
        {
          id: 3,
          category: 'Advanced',
          skills: [
            { name: 'Computer Vision (CNNs)', duration: '8 weeks', priority: 'medium' },
            { name: 'Natural Language Processing', duration: '8 weeks', priority: 'medium' },
            { name: 'Model Deployment (MLOps)', duration: '6 weeks', priority: 'high' }
          ]
        }
      ],
      projects: [
        {
          title: 'Image Classification System',
          description: 'Build a CNN model to classify images with 95%+ accuracy',
          difficulty: 'Intermediate',
          duration: '3 weeks',
          skills: ['Python', 'TensorFlow', 'CNN'],
          deliverables: ['Trained Model', 'API', 'Demo App']
        },
        {
          title: 'Sentiment Analysis Tool',
          description: 'Create an NLP model to analyze sentiment in social media posts',
          difficulty: 'Intermediate',
          duration: '3 weeks',
          skills: ['Python', 'NLP', 'LSTM'],
          deliverables: ['Model', 'Web Interface', 'Analysis Report']
        },
        {
          title: 'Recommendation Engine',
          description: 'Build a collaborative filtering system like Netflix recommendations',
          difficulty: 'Advanced',
          duration: '4 weeks',
          skills: ['Python', 'ML', 'Matrix Factorization'],
          deliverables: ['Algorithm', 'API', 'Performance Metrics']
        }
      ]
    },
    
    'Data Scientist': {
      salary: '\$95,000 - \$165,000',
      growth: '+28%',
      demandScore: 5,
      industries: ['Tech/Software', 'Finance/Banking', 'Healthcare', 'E-commerce', 'Research'],
      description: 'Apply advanced analytics, statistical modeling, and machine learning to extract insights and drive business decisions',
      averageTime: '10-16 months',
      requiredSkills: ['Python', 'Statistics', 'Machine Learning', 'Data Analysis'],
      skillPathway: [
        {
          id: 1,
          category: 'Foundation',
          skills: [
            { name: 'Python for Data Science', duration: '6 weeks', priority: 'high' },
            { name: 'Statistics & Hypothesis Testing', duration: '8 weeks', priority: 'high' },
            { name: 'SQL & Data Querying', duration: '4 weeks', priority: 'high' }
          ]
        },
        {
          id: 2,
          category: 'Core Analytics',
          skills: [
            { name: 'Exploratory Data Analysis (EDA)', duration: '4 weeks', priority: 'high' },
            { name: 'Data Visualization (Matplotlib, Seaborn)', duration: '4 weeks', priority: 'high' },
            { name: 'Feature Engineering', duration: '6 weeks', priority: 'high' }
          ]
        },
        {
          id: 3,
          category: 'Advanced',
          skills: [
            { name: 'Machine Learning Algorithms', duration: '10 weeks', priority: 'high' },
            { name: 'A/B Testing & Experimentation', duration: '4 weeks', priority: 'medium' },
            { name: 'Big Data Tools (Spark, Hadoop)', duration: '6 weeks', priority: 'medium' }
          ]
        }
      ],
      projects: [
        {
          title: 'Customer Churn Prediction',
          description: 'Build a predictive model to identify customers likely to leave',
          difficulty: 'Intermediate',
          duration: '3 weeks',
          skills: ['Python', 'ML', 'Feature Engineering'],
          deliverables: ['Model', 'Analysis Report', 'Business Recommendations']
        },
        {
          title: 'Sales Forecasting Dashboard',
          description: 'Create time series forecasting model with interactive visualization',
          difficulty: 'Intermediate',
          duration: '3 weeks',
          skills: ['Python', 'Time Series', 'Tableau'],
          deliverables: ['Model', 'Dashboard', 'Documentation']
        },
        {
          title: 'Market Basket Analysis',
          description: 'Discover product associations using association rule mining',
          difficulty: 'Advanced',
          duration: '3 weeks',
          skills: ['Python', 'Apriori', 'Data Mining'],
          deliverables: ['Analysis', 'Recommendations', 'Visualization']
        }
      ]
    },

    'Data Analyst': {
      salary: '\$70,000 - \$120,000',
      growth: '+22%',
      demandScore: 5,
      industries: ['Tech/Software', 'Finance/Banking', 'Healthcare', 'E-commerce', 'Consulting'],
      description: 'Analyze complex data sets to extract actionable insights, create visualizations, and support data-driven decision making',
      averageTime: '6-12 months',
      requiredSkills: ['SQL', 'Python', 'Data Visualization', 'Excel'],
      skillPathway: [
        {
          id: 1,
          category: 'Foundation',
          skills: [
            { name: 'SQL & Database Fundamentals', duration: '5 weeks', priority: 'high' },
            { name: 'Excel Advanced Functions', duration: '3 weeks', priority: 'high' },
            { name: 'Python Basics', duration: '4 weeks', priority: 'high' }
          ]
        },
        {
          id: 2,
          category: 'Core Technical',
          skills: [
            { name: 'Data Cleaning & Preprocessing', duration: '4 weeks', priority: 'high' },
            { name: 'Data Visualization (Tableau/PowerBI)', duration: '6 weeks', priority: 'high' },
            { name: 'Statistics Fundamentals', duration: '6 weeks', priority: 'high' }
          ]
        },
        {
          id: 3,
          category: 'Business Skills',
          skills: [
            { name: 'Business Communication', duration: '4 weeks', priority: 'high' },
            { name: 'Stakeholder Management', duration: '3 weeks', priority: 'medium' },
            { name: 'Data Storytelling', duration: '3 weeks', priority: 'high' }
          ]
        }
      ],
      projects: [
        {
          title: 'Sales Performance Dashboard',
          description: 'Build interactive dashboard analyzing sales trends across regions',
          difficulty: 'Beginner',
          duration: '2 weeks',
          skills: ['SQL', 'Tableau', 'Excel'],
          deliverables: ['Dashboard', 'SQL Queries', 'Insights Report']
        },
        {
          title: 'Customer Segmentation Analysis',
          description: 'Segment customers based on behavior and demographics',
          difficulty: 'Intermediate',
          duration: '3 weeks',
          skills: ['Python', 'Clustering', 'Visualization'],
          deliverables: ['Analysis', 'Segments', 'Recommendations']
        },
        {
          title: 'A/B Test Analysis',
          description: 'Design and analyze A/B test to evaluate website changes',
          difficulty: 'Advanced',
          duration: '2 weeks',
          skills: ['Statistics', 'Python', 'Hypothesis Testing'],
          deliverables: ['Test Design', 'Statistical Analysis', 'Executive Summary']
        }
      ]
    },

    'Full Stack Developer': {
      salary: '\$80,000 - \$145,000',
      growth: '+23%',
      demandScore: 5,
      industries: ['Tech/Software', 'Startups', 'E-commerce', 'SaaS', 'Consulting'],
      description: 'Build complete web applications from frontend UI to backend APIs and databases',
      averageTime: '8-14 months',
      requiredSkills: ['JavaScript', 'React', 'Node.js', 'SQL', 'APIs'],
      skillPathway: [
        {
          id: 1,
          category: 'Frontend',
          skills: [
            { name: 'HTML, CSS, JavaScript', duration: '6 weeks', priority: 'high' },
            { name: 'React.js Fundamentals', duration: '8 weeks', priority: 'high' },
            { name: 'State Management (Redux/Context)', duration: '4 weeks', priority: 'medium' }
          ]
        },
        {
          id: 2,
          category: 'Backend',
          skills: [
            { name: 'Node.js & Express', duration: '8 weeks', priority: 'high' },
            { name: 'RESTful API Design', duration: '4 weeks', priority: 'high' },
            { name: 'SQL & NoSQL Databases', duration: '6 weeks', priority: 'high' }
          ]
        },
        {
          id: 3,
          category: 'DevOps & Tools',
          skills: [
            { name: 'Git & GitHub', duration: '2 weeks', priority: 'high' },
            { name: 'Docker Basics', duration: '4 weeks', priority: 'medium' },
            { name: 'CI/CD & Deployment', duration: '4 weeks', priority: 'medium' }
          ]
        }
      ],
      projects: [
        {
          title: 'Task Management App',
          description: 'Build a full-stack todo app with authentication',
          difficulty: 'Beginner',
          duration: '3 weeks',
          skills: ['React', 'Node.js', 'MongoDB'],
          deliverables: ['Frontend', 'Backend API', 'Deployed App']
        },
        {
          title: 'E-commerce Platform',
          description: 'Create online store with cart, payments, and admin panel',
          difficulty: 'Intermediate',
          duration: '6 weeks',
          skills: ['React', 'Node.js', 'Stripe', 'PostgreSQL'],
          deliverables: ['Full App', 'Payment Integration', 'Admin Dashboard']
        },
        {
          title: 'Real-time Chat Application',
          description: 'Build chat app with WebSockets and real-time messaging',
          difficulty: 'Advanced',
          duration: '4 weeks',
          skills: ['React', 'Socket.io', 'Redis', 'Node.js'],
          deliverables: ['Chat App', 'Real-time Features', 'Scalable Backend']
        }
      ]
    },

    'UI/UX Designer': {
      salary: '\$70,000 - \$130,000',
      growth: '+18%',
      demandScore: 4,
      industries: ['Tech/Software', 'E-commerce', 'Gaming', 'Startups', 'Design Agencies'],
      description: 'Design intuitive user interfaces and create exceptional user experiences for digital products',
      averageTime: '6-10 months',
      requiredSkills: ['Figma', 'UI Design', 'User Research', 'Prototyping'],
      skillPathway: [
        {
          id: 1,
          category: 'Foundation',
          skills: [
            { name: 'Design Principles & Theory', duration: '4 weeks', priority: 'high' },
            { name: 'Figma/Adobe XD Mastery', duration: '6 weeks', priority: 'high' },
            { name: 'Typography & Color Theory', duration: '3 weeks', priority: 'high' }
          ]
        },
        {
          id: 2,
          category: 'UX Research',
          skills: [
            { name: 'User Research Methods', duration: '5 weeks', priority: 'high' },
            { name: 'Information Architecture', duration: '4 weeks', priority: 'high' },
            { name: 'Wireframing & Prototyping', duration: '5 weeks', priority: 'high' }
          ]
        },
        {
          id: 3,
          category: 'Advanced',
          skills: [
            { name: 'Interaction Design', duration: '6 weeks', priority: 'medium' },
            { name: 'Design Systems', duration: '5 weeks', priority: 'medium' },
            { name: 'Usability Testing', duration: '4 weeks', priority: 'high' }
          ]
        }
      ],
      projects: [
        {
          title: 'Mobile App Redesign',
          description: 'Redesign existing app with improved UX and modern UI',
          difficulty: 'Beginner',
          duration: '3 weeks',
          skills: ['Figma', 'UI Design', 'Mobile Design'],
          deliverables: ['Design System', 'High-fidelity Mockups', 'Prototype']
        },
        {
          title: 'E-commerce User Flow',
          description: 'Design complete checkout experience with user research',
          difficulty: 'Intermediate',
          duration: '4 weeks',
          skills: ['User Research', 'Wireframing', 'Prototyping'],
          deliverables: ['Research Report', 'User Flows', 'Interactive Prototype']
        },
        {
          title: 'Design System Creation',
          description: 'Build comprehensive design system for SaaS product',
          difficulty: 'Advanced',
          duration: '5 weeks',
          skills: ['Component Design', 'Documentation', 'Design Tokens'],
          deliverables: ['Design System', 'Component Library', 'Guidelines']
        }
      ]
    },

    'Software Engineer': {
      salary: '\$85,000 - \$150,000',
      growth: '+25%',
      demandScore: 5,
      industries: ['Tech/Software', 'Finance', 'Healthcare', 'E-commerce', 'Startups'],
      description: 'Design, develop, and maintain software applications and systems using modern programming practices',
      averageTime: '8-14 months',
      requiredSkills: ['Programming', 'Algorithms', 'System Design', 'Problem Solving'],
      skillPathway: [
        {
          id: 1,
          category: 'Foundation',
          skills: [
            { name: 'Programming Language (Python/Java)', duration: '8 weeks', priority: 'high' },
            { name: 'Data Structures', duration: '8 weeks', priority: 'high' },
            { name: 'Algorithms', duration: '8 weeks', priority: 'high' }
          ]
        },
        {
          id: 2,
          category: 'Software Development',
          skills: [
            { name: 'Object-Oriented Programming', duration: '6 weeks', priority: 'high' },
            { name: 'Design Patterns', duration: '6 weeks', priority: 'medium' },
            { name: 'Testing & Debugging', duration: '4 weeks', priority: 'high' }
          ]
        },
        {
          id: 3,
          category: 'System Design',
          skills: [
            { name: 'System Design Fundamentals', duration: '8 weeks', priority: 'high' },
            { name: 'Databases & Caching', duration: '6 weeks', priority: 'high' },
            { name: 'API Design', duration: '4 weeks', priority: 'medium' }
          ]
        }
      ],
      projects: [
        {
          title: 'Algorithm Visualizer',
          description: 'Build tool to visualize sorting and pathfinding algorithms',
          difficulty: 'Beginner',
          duration: '3 weeks',
          skills: ['JavaScript', 'Algorithms', 'Visualization'],
          deliverables: ['Web App', 'Multiple Algorithms', 'Documentation']
        },
        {
          title: 'URL Shortener Service',
          description: 'Create scalable URL shortening service like bit.ly',
          difficulty: 'Intermediate',
          duration: '3 weeks',
          skills: ['Backend', 'Databases', 'System Design'],
          deliverables: ['API', 'Database Schema', 'Analytics']
        },
        {
          title: 'Distributed Cache System',
          description: 'Implement distributed caching system with consistency',
          difficulty: 'Advanced',
          duration: '5 weeks',
          skills: ['System Design', 'Redis', 'Distributed Systems'],
          deliverables: ['Cache Implementation', 'Documentation', 'Benchmarks']
        }
      ]
    }
  },

  // Determine career role from assessment
  determineCareerRole(assessmentData) {
    if (!assessmentData) return 'Data Analyst';

    const goal = (assessmentData.careerGoal || '').toLowerCase();
    const skills = assessmentData.skills || [];

    // Priority 1: Check career goal keywords
    if (goal.includes('machine learning') || goal.includes('ml') || goal.includes('ai')) {
      return 'Machine Learning Engineer';
    }
    if (goal.includes('data scientist')) {
      return 'Data Scientist';
    }
    if (goal.includes('full stack') || goal.includes('fullstack')) {
      return 'Full Stack Developer';
    }
    if (goal.includes('ui') || goal.includes('ux') || goal.includes('design')) {
      return 'UI/UX Designer';
    }
    if (goal.includes('software engineer') || goal.includes('swe')) {
      return 'Software Engineer';
    }
    if (goal.includes('data analyst') || goal.includes('analyst')) {
      return 'Data Analyst';
    }

    // Priority 2: Skills-based matching
    const skillScores = {
      'Machine Learning Engineer': 0,
      'Data Scientist': 0,
      'Data Analyst': 0,
      'Full Stack Developer': 0,
      'UI/UX Designer': 0,
      'Software Engineer': 0
    };

    // Score based on skills
    if (skills.includes('Machine Learning')) {
      skillScores['Machine Learning Engineer'] += 3;
      skillScores['Data Scientist'] += 2;
    }
    if (skills.includes('Python')) {
      skillScores['Machine Learning Engineer'] += 2;
      skillScores['Data Scientist'] += 2;
      skillScores['Data Analyst'] += 1;
    }
    if (skills.includes('Data Analysis')) {
      skillScores['Data Analyst'] += 3;
      skillScores['Data Scientist'] += 2;
    }
    if (skills.includes('SQL')) {
      skillScores['Data Analyst'] += 2;
      skillScores['Data Scientist'] += 1;
    }
    if (skills.includes('JavaScript') || skills.includes('Web Development')) {
      skillScores['Full Stack Developer'] += 3;
    }
    if (skills.includes('UI/UX Design')) {
      skillScores['UI/UX Designer'] += 3;
    }

    // Find highest score
    let maxScore = 0;
    let bestRole = 'Software Engineer'; // Default fallback

    for (const [role, score] of Object.entries(skillScores)) {
      if (score > maxScore) {
        maxScore = score;
        bestRole = role;
      }
    }

    return bestRole;
  },

  // Get complete career pathway data
  getCareerPathway(assessmentData) {
    const role = this.determineCareerRole(assessmentData);
    const careerInfo = this.careerDatabase[role] || this.careerDatabase['Data Analyst'];

    // Calculate time based on year of study
    let averageTime = careerInfo.averageTime;
    if (assessmentData?.year === 'graduate') {
      averageTime = careerInfo.averageTime.split('-')[0] + ' months';
    } else if (assessmentData?.year === '4') {
      averageTime = careerInfo.averageTime;
    } else if (assessmentData?.year === '3') {
      const nums = careerInfo.averageTime.match(/\d+/g);
      if (nums && nums.length >= 2) {
        const increased = `${parseInt(nums[0]) + 3}-${parseInt(nums[1]) + 3} months`;
        averageTime = increased;
      }
    }

    // Calculate match score based on assessment
    const matchScore = this.calculateMatchScore(assessmentData, role);

    // Personalize skill pathway based on user's current skills
    const personalizedSkills = this.personalizeSkillPathway(
      careerInfo.skillPathway,
      assessmentData?.skills || []
    );

    return {
      role,
      matchScore,
      salary: careerInfo.salary,
      growth: careerInfo.growth,
      demandScore: careerInfo.demandScore,
      industries: careerInfo.industries,
      description: careerInfo.description,
      averageTimeToJob: averageTime,
      skillPathway: personalizedSkills,
      projects: careerInfo.projects
    };
  },

  // Calculate match score
  calculateMatchScore(assessmentData, role) {
    if (!assessmentData) return 75;

    let score = 0;
    const maxScore = 100;

    const careerInfo = this.careerDatabase[role];
    const userSkills = assessmentData.skills || [];
    const requiredSkills = careerInfo.requiredSkills;

    // Skills match (40 points)
    const matchingSkills = userSkills.filter(skill => 
      requiredSkills.some(req => 
        skill.toLowerCase().includes(req.toLowerCase()) || 
        req.toLowerCase().includes(skill.toLowerCase())
      )
    );
    score += (matchingSkills.length / requiredSkills.length) * 40;

    // GPA contribution (20 points)
    const gpa = parseFloat(assessmentData.gpa);
    if (gpa >= 8.5 || gpa >= 3.7) score += 20;
    else if (gpa >= 7.5 || gpa >= 3.0) score += 15;
    else if (gpa >= 6.5 || gpa >= 2.5) score += 10;
    else score += 5;

    // Projects (15 points)
    const projects = parseInt(assessmentData.projectsCompleted) || 0;
    score += Math.min(projects * 3, 15);

    // Interest alignment (25 points)
    const interests = {
      'Machine Learning Engineer': ['problemSolving', 'logicPuzzles', 'dataAnalysis'],
      'Data Scientist': ['dataAnalysis', 'problemSolving', 'logicPuzzles'],
      'Data Analyst': ['dataAnalysis', 'communication', 'problemSolving'],
      'Full Stack Developer': ['problemSolving', 'creativeDesign', 'logicPuzzles'],
      'UI/UX Designer': ['creativeDesign', 'communication', 'problemSolving'],
      'Software Engineer': ['problemSolving', 'logicPuzzles', 'teamLeadership']
    };

    const relevantInterests = interests[role] || [];
    let interestScore = 0;
    relevantInterests.forEach(interest => {
      interestScore += (assessmentData[interest] || 0);
    });
    score += (interestScore / (relevantInterests.length * 5)) * 25;

    return Math.min(Math.round(score), 99);
  },

  // Personalize skill pathway
  personalizeSkillPathway(skillPathway, userSkills) {
    return skillPathway.map(category => {
      const personalizedSkills = category.skills.map(skill => {
        // Check if user already has this skill
        const hasSkill = userSkills.some(userSkill => 
          skill.name.toLowerCase().includes(userSkill.toLowerCase()) ||
          userSkill.toLowerCase().includes(skill.name.toLowerCase().split(' ')[0])
        );

        let status = 'not-started';
        let progress = 0;

        if (hasSkill) {
          status = 'in-progress';
          progress = Math.floor(Math.random() * 30) + 40; // 40-70%
        }

        return {
          ...skill,
          status,
          progress
        };
      });

      return {
        ...category,
        skills: personalizedSkills
      };
    });
  },

  // Get relevant courses based on career path
  getRelevantCourses(role) {
    const allCourses = {
      'Machine Learning Engineer': [
        {
          title: 'Machine Learning Specialization',
          platform: 'Coursera',
          provider: 'Andrew Ng, Stanford',
          duration: '3 months',
          rating: 4.9,
          level: 'Beginner',
          price: 'Free (Audit)',
          skills: ['Machine Learning', 'Python', 'Neural Networks']
        },
        {
          title: 'Deep Learning Specialization',
          platform: 'Coursera',
          provider: 'deeplearning.ai',
          duration: '5 months',
          rating: 4.9,
          level: 'Intermediate',
          price: '\$49/month',
          skills: ['Deep Learning', 'TensorFlow', 'CNN', 'RNN']
        },
        {
          title: 'MLOps Fundamentals',
          platform: 'Udacity',
          provider: 'Google Cloud',
          duration: '4 months',
          rating: 4.7,
          level: 'Advanced',
          price: '\$399/month',
          skills: ['MLOps', 'Deployment', 'CI/CD']
        }
      ],
      'Data Scientist': [
        {
          title: 'Python for Data Science',
          platform: 'Coursera',
          provider: 'IBM',
          duration: '4 weeks',
          rating: 4.8,
          level: 'Beginner',
          price: 'Free (Audit)',
          skills: ['Python', 'Pandas', 'NumPy']
        },
        {
          title: 'Statistics for Data Science',
          platform: 'edX',
          provider: 'MIT',
          duration: '6 weeks',
          rating: 4.9,
          level: 'Intermediate',
          price: '\$99 (Verified)',
          skills: ['Statistics', 'Probability', 'Hypothesis Testing']
        },
        {
          title: 'Advanced Data Science',
          platform: 'DataCamp',
          provider: 'DataCamp',
          duration: '3 months',
          rating: 4.7,
          level: 'Advanced',
          price: '\$25/month',
          skills: ['ML', 'Feature Engineering', 'Model Selection']
        }
      ],
      'Data Analyst': [
        {
          title: 'SQL for Data Science',
          platform: 'Coursera',
          provider: 'UC Davis',
          duration: '4 weeks',
          rating: 4.8,
          level: 'Beginner',
          price: 'Free (Audit)',
          skills: ['SQL', 'Database Design']
        },
        {
          title: 'Data Visualization with Tableau',
          platform: 'Udemy',
          provider: 'Kirill Eremenko',
          duration: '9 hours',
          rating: 4.6,
          level: 'Intermediate',
          price: '\$49.99',
          skills: ['Tableau', 'Data Viz', 'Storytelling']
        },
        {
          title: 'Excel Skills for Business',
          platform: 'Coursera',
          provider: 'Macquarie University',
          duration: '6 months',
          rating: 4.8,
          level: 'Beginner',
          price: 'Free (Audit)',
          skills: ['Excel', 'Pivot Tables', 'Data Analysis']
        }
      ],
      'Full Stack Developer': [
        {
          title: 'The Complete Web Developer Bootcamp',
          platform: 'Udemy',
          provider: 'Angela Yu',
          duration: '65 hours',
          rating: 4.7,
          level: 'Beginner',
          price: '\$49.99',
          skills: ['HTML', 'CSS', 'JavaScript', 'Node.js']
        },
        {
          title: 'React - The Complete Guide',
          platform: 'Udemy',
          provider: 'Maximilian Schwarzmüller',
          duration: '48 hours',
          rating: 4.8,
          level: 'Intermediate',
          price: '\$49.99',
          skills: ['React', 'Hooks', 'Redux']
        },
        {
          title: 'Node.js, Express, MongoDB',
          platform: 'Udemy',
          provider: 'Jonas Schmedtmann',
          duration: '42 hours',
          rating: 4.8,
          level: 'Intermediate',
          price: '\$49.99',
          skills: ['Node.js', 'Express', 'MongoDB', 'REST API']
        }
      ],
      'UI/UX Designer': [
        {
          title: 'Google UX Design Certificate',
          platform: 'Coursera',
          provider: 'Google',
          duration: '6 months',
          rating: 4.8,
          level: 'Beginner',
          price: '\$49/month',
          skills: ['UX Design', 'Figma', 'Wireframing']
        },
        {
          title: 'UI Design Fundamentals',
          platform: 'Udemy',
          provider: 'Joe Natoli',
          duration: '7 hours',
          rating: 4.7,
          level: 'Beginner',
          price: '\$49.99',
          skills: ['UI Design', 'Design Principles', 'Typography']
        },
        {
          title: 'Advanced Figma: Design Systems',
          platform: 'Skillshare',
          provider: 'Pablo Stanley',
          duration: '3 hours',
          rating: 4.8,
          level: 'Advanced',
          price: '\$32/month',
          skills: ['Figma', 'Design Systems', 'Components']
        }
      ],
      'Software Engineer': [
        {
          title: 'Data Structures and Algorithms',
          platform: 'Coursera',
          provider: 'UC San Diego',
          duration: '6 months',
          rating: 4.7,
          level: 'Intermediate',
          price: '\$49/month',
          skills: ['Algorithms', 'Data Structures', 'Problem Solving']
        },
        {
          title: 'System Design Interview',
          platform: 'Educative',
          provider: 'Educative',
          duration: '3 months',
          rating: 4.8,
          level: 'Advanced',
          price: '\$59/month',
          skills: ['System Design', 'Scalability', 'Architecture']
        },
        {
          title: 'Clean Code Fundamentals',
          platform: 'Pluralsight',
          provider: 'Robert Martin',
          duration: '5 hours',
          rating: 4.9,
          level: 'Intermediate',
          price: '\$29/month',
          skills: ['Clean Code', 'Refactoring', 'Design Patterns']
        }
      ]
    };

    return allCourses[role] || allCourses['Software Engineer'];
  }
};

export default careerPathwayService;