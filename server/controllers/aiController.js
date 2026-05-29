const {GoogleGenerativeAI} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const getRecommendations = async(req, res) => {
    try{
        const {skills} = req.body;
        const model = genAI.getGenerativeModel({
            model: "models/gemini-2.5-flash",
        });

        const prompt = `
        Suggest suitable jobs for these skills: 
        ${skills}
        Give short bullet points only.`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();
        res.json({response});
    }catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {getRecommendations};