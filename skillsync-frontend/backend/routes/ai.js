// backend/routes/ai.js
const express = require('express');
const router = express.Router();
const openaiService = require('../services/openaiService');
const { aiLimiter } = require('../middleware/rateLimiter');

// Apply rate limiting to all AI routes
router.use(aiLimiter);

// POST /api/ai/career-recommendations
router.post('/career-recommendations', async (req, res) => {
  try {
    const { assessmentData } = req.body;
    
    if (!assessmentData) {
      return res.status(400).json({ error: 'Assessment data is required' });
    }

    const recommendations = await openaiService.generateCareerRecommendations(assessmentData);
    res.json(recommendations);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/ai/learning-path
router.post('/learning-path', async (req, res) => {
  try {
    const { role, currentSkills, timeCommitment } = req.body;
    
    if (!role || !currentSkills) {
      return res.status(400).json({ error: 'Role and current skills are required' });
    }

    const learningPath = await openaiService.generateLearningPath(
      role,
      currentSkills,
      timeCommitment || 10
    );
    res.json(learningPath);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await openaiService.chatWithAI(message, conversationHistory || []);
    res.json({ response });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/ai/project-ideas
router.post('/project-ideas', async (req, res) => {
  try {
    const { role, skills, difficulty } = req.body;
    
    if (!role || !skills) {
      return res.status(400).json({ error: 'Role and skills are required' });
    }

    const projects = await openaiService.generateProjectIdeas(
      role,
      skills,
      difficulty || 'intermediate'
    );
    res.json(projects);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/ai/skill-gaps
router.post('/skill-gaps', async (req, res) => {
  try {
    const { targetRole, currentSkills, assessmentData } = req.body;
    
    if (!targetRole || !currentSkills) {
      return res.status(400).json({ error: 'Target role and current skills are required' });
    }

    const analysis = await openaiService.analyzeSkillGaps(
      targetRole,
      currentSkills,
      assessmentData || {}
    );
    res.json(analysis);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;