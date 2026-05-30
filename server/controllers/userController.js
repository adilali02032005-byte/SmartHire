const User = require("../models/User");

const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json(user);
};

const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  user.name = req.body.name || user.name;
  user.phone = req.body.phone || user.phone;
  user.education = req.body.education || user.education;
  user.skills = req.body.skills || user.skills;

  const updatedUser = await user.save();

  res.json(updatedUser);
};

module.exports = {
  getProfile,
  updateProfile,
};