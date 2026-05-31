const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

const getStats = async (req, res) => {
    try{
        const totalUsers = await User.countDocuments();
        const recruiters = await User.countDocuments({
            role: "recruiter",
        });
        const candidates = await User.countDocuments({
            role:"candidate",
        });
        const jobs = await Job.countDocuments();
        const applications = await Application.countDocuments();
        res.json({
            totalUsers,
            recruiters,
            candidates,
            jobs,
            applications,
        });
    }catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports={getStats};