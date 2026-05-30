const Application = require("../models/Application");

const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;

    const exists = await Application.findOne({ jobId, userId });

    if (exists) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({ jobId, userId });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobApplicants = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const applications = await Application.find({ jobId })
      .populate("userId", "name email resume skills phone education")
      .populate("jobId", "title company");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;

    await Application.findByIdAndDelete(applicationId);

    res.json({ message: "Application removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ userId: req.user.id })
      .populate({
        path: "jobId",
        select: "title company location",
      });

    const filtered = apps.filter(app => app.jobId !== null);

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const shortlistCandidate = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);

    if (!app) return res.status(404).json({ message: "Not found" });

    app.status = "shortlisted";
    await app.save();

    res.json({ message: "Shortlisted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  applyJob,
  getJobApplicants,
  deleteApplication,
  getMyApplications,
  shortlistCandidate,
};