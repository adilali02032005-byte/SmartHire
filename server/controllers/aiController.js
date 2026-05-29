const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getRecommendations = async (req, res) => {
  try {
    const { skills, jobs } = req.body;

    if (!jobs || jobs.length === 0) {
      return res.json({
        response: JSON.stringify({ jobs: [] }),
      });
    }

    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash-lite",
    });

    const prompt = `
You are a job ranking system.

RULES:
- ONLY use provided jobs
- return TOP 3 most relevant jobs
- return ONLY valid JSON

Skills:
${skills}

Jobs:
${JSON.stringify(jobs)}

Return format:
{
  "jobs": [
    {
      "title": "exact job title",
      "match": "High | Medium | Low",
      "reason": "short explanation"
    }
  ]
}
`;

    const result = await model.generateContent(prompt);

    let response = result.response.text();

    response = response.replace(/```json/g, "").replace(/```/g, "").trim();

    res.json({ response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getRecommendations };