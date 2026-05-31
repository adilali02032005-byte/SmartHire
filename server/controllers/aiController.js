const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getRecommendations = async (req, res) => {
  try {
    const { skills, jobs } = req.body;

    if (!jobs || jobs.length === 0) {
      return res.json({ jobs: [] });
    }

    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
    });

    const prompt = `
    You are a STRICT job FILTER.

    RULES:
    - ONLY return relevant jobs
    - REMOVE all irrelevant jobs
    - DO NOT include Low/Medium/High
    - If nothing matches, return empty array

    Skills:
    ${skills}

    Jobs:
    ${JSON.stringify(jobs)}

    Return ONLY valid JSON:
    {
      "jobs": [
        {
          "title": "exact job title",
          "reason": "why it matches"
        }
      ]
    }
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.log("JSON PARSE FAILED");
      console.log(text);

      return res.status(500).json({
        message: "AI returned invalid JSON",
        raw: text,
      });
    }

    const jobs = parsed.jobs || [];

    if (jobs.length === 0) {
      return res.json({
        message: "No posted jobs currently match your skills",
        jobs: [],
      });
    }

    return res.json({
      message: null,
      jobs,
    });

  } catch (error) {
    console.log("AI CONTROLLER ERROR:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {getRecommendations};