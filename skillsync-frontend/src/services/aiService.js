// frontend/src/services/aiService.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class AIService {
  constructor() {
    this.baseURL = API_URL;
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
  }

  // Helper for API calls with caching
  async fetchWithCache(endpoint, options = {}, cacheKey = null) {
    // Check cache first
    if (cacheKey && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheExpiry) {
        console.log('Using cached response for:', cacheKey);
        return cached.data;
      }
      this.cache.delete(cacheKey);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        ...options
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'API request failed');
      }

      const data = await response.json();

      // Cache the response
      if (cacheKey) {
        this.cache.set(cacheKey, { data, timestamp: Date.now() });
      }

      return data;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }

  // Get AI-powered career recommendations
  async getCareerRecommendations(assessmentData) {
    const cacheKey = `career_${JSON.stringify(assessmentData.careerGoal)}_${assessmentData.skills?.length}`;
    
    return this.fetchWithCache(
      '/ai/career-recommendations',
      {
        body: JSON.stringify({ assessmentData })
      },
      cacheKey
    );
  }

  // Generate personalized learning path
  async generateLearningPath(role, currentSkills, timeCommitment) {
    const cacheKey = `learning_${role}_${currentSkills.length}_${timeCommitment}`;
    
    return this.fetchWithCache(
      '/ai/learning-path',
      {
        body: JSON.stringify({ role, currentSkills, timeCommitment })
      },
      cacheKey
    );
  }

  // Chat with AI assistant
  async chat(message, conversationHistory = []) {
    // Don't cache chat responses (they should be unique)
    return this.fetchWithCache(
      '/ai/chat',
      {
        body: JSON.stringify({ message, conversationHistory })
      }
    );
  }

  // Get AI-generated project ideas
  async getProjectIdeas(role, skills, difficulty = 'intermediate') {
    const cacheKey = `projects_${role}_${difficulty}_${skills.length}`;
    
    return this.fetchWithCache(
      '/ai/project-ideas',
      {
        body: JSON.stringify({ role, skills, difficulty })
      },
      cacheKey
    );
  }

  // Analyze skill gaps
  async analyzeSkillGaps(targetRole, currentSkills, assessmentData) {
    const cacheKey = `gaps_${targetRole}_${currentSkills.length}`;
    
    return this.fetchWithCache(
      '/ai/skill-gaps',
      {
        body: JSON.stringify({ targetRole, currentSkills, assessmentData })
      },
      cacheKey
    );
  }

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL.replace('/api', '')}/api/health`);
      return await response.json();
    } catch (error) {
      console.error('Backend health check failed:', error);
      return { status: 'error', message: 'Backend unavailable' };
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }
}

export const aiService = new AIService();
export default aiService;