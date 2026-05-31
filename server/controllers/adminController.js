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

const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

const deleteUser = async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res.status(400).json({
        message: "Cannot delete your own account",
      });
    }
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports={getStats, getUsers, deleteUser};