// backend/services/openaiService.js
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class OpenAIService {
  // Generate career recommendations
  async generateCareerRecommendations(assessmentData) {
    try {
      const prompt = `You are a career counselor AI. Based on the following student assessment data, provide personalized career recommendations.

Student Profile:
- Branch: ${assessmentData.branch}
- Year: ${assessmentData.year}
- GPA: ${assessmentData.gpa}
- Projects Completed: ${assessmentData.projectsCompleted}
- Skills: ${assessmentData.skills?.join(', ') || 'None specified'}
- Career Goal: ${assessmentData.careerGoal}
- Preferred Industries: ${assessmentData.preferredIndustries?.join(', ') || 'None'}
- Interest Ratings (1-5):
  - Logic/Algorithms: ${assessmentData.logicPuzzles}
  - Data Analysis: ${assessmentData.dataAnalysis}
  - Team Leadership: ${assessmentData.teamLeadership}
  - Creative Design: ${assessmentData.creativeDesign}
  - Communication: ${assessmentData.communication}
  - Problem Solving: ${assessmentData.problemSolving}

Provide:
1. Top 3 recommended career roles (with match percentage)
2. Key strengths based on their profile
3. Skill gaps they should address
4. 3 actionable next steps

Format as JSON with this structure:
{
  "recommendedRoles": [
    {"role": "Role Name", "matchScore": 85, "reason": "Why this fits"}
  ],
  "strengths": ["strength1", "strength2"],
  "skillGaps": ["gap1", "gap2"],
  "nextSteps": ["step1", "step2", "step3"]
}`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert career counselor specializing in tech and engineering careers. Provide practical, actionable advice.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        response_format: { type: "json_object" }
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate career recommendations');
    }
  }

  // Generate personalized learning path
  async generateLearningPath(role, currentSkills, timeCommitment) {
    try {
      const prompt = `Create a detailed 12-week learning path for someone who wants to become a ${role}.

Current Skills: ${currentSkills.join(', ')}
Weekly Time Available: ${timeCommitment} hours

Provide a week-by-week breakdown with:
- Week number
- Focus area
- Specific topics to learn
- Recommended resources
- Practice projects

Format as JSON array:
[
  {
    "week": 1,
    "focusArea": "Area name",
    "topics": ["topic1", "topic2"],
    "estimatedHours": 10,
    "projects": ["project description"]
  }
]`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert learning path designer. Create practical, achievable learning plans.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate learning path');
    }
  }

  // AI Chat for career questions
  async chatWithAI(userMessage, conversationHistory = []) {
    try {
      const messages = [
        {
          role: 'system',
          content: `You are SkillSync AI, a friendly career guidance assistant for students. You help with:
- Career advice and exploration
- Skill development guidance
- Learning resource recommendations
- Job search tips
- Resume and portfolio advice
- Interview preparation

Be encouraging, practical, and specific. Keep responses concise but helpful.`
        },
        ...conversationHistory,
        {
          role: 'user',
          content: userMessage
        }
      ];

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.8,
        max_tokens: 500
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to get AI response');
    }
  }

  // Generate project ideas
  async generateProjectIdeas(role, skills, difficulty) {
    try {
      const prompt = `Generate 5 project ideas for someone learning to become a ${role}.

Their current skills: ${skills.join(', ')}
Difficulty level: ${difficulty}

For each project provide:
- Project title
- Brief description (2-3 sentences)
- Key skills practiced
- Estimated time to complete
- Deliverables

Format as JSON array.`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a project idea generator for portfolio building. Create practical, impressive projects.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.9,
        max_tokens: 1500,
        response_format: { type: "json_object" }
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate project ideas');
    }
  }

  // Analyze skill gaps
  async analyzeSkillGaps(targetRole, currentSkills, assessmentData) {
    try {
      const prompt = `Analyze skill gaps for someone wanting to become a ${targetRole}.

Current skills: ${currentSkills.join(', ')}
Assessment scores (1-5):
- Problem Solving: ${assessmentData.problemSolving}
- Data Analysis: ${assessmentData.dataAnalysis}
- Team Leadership: ${assessmentData.teamLeadership}
- Communication: ${assessmentData.communication}

Provide:
1. Critical skills they're missing
2. Skills they should improve
3. Priority order for learning
4. Estimated time to bridge gaps

Format as JSON.`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a skill gap analyzer. Be honest but encouraging.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 800,
        response_format: { type: "json_object" }
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to analyze skill gaps');
    }
  }
}

module.exports = new OpenAIService();