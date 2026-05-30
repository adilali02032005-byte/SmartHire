const express = require("express");
const router = express.Router();

const {applyJob, getJobApplicants, deleteApplication, getMyApplications, shortlistCandidate} = require("../controllers/applicationController");
const protect = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleMiddleware");

//candidate app history
router.get("/my-applications", protect, roleCheck("candidate"), getMyApplications);

//apply to job
router.post("/job/:id", protect, roleCheck("candidate"), applyJob);

//view candidates
router.get("/job/:jobId", protect, roleCheck("recruiter", "admin"), getJobApplicants);

//delete job
router.delete("/:id", protect, roleCheck("recruiter"), deleteApplication);

//short list candidates
router.put("/shortlist/:id", protect, shortlistCandidate);

module.exports = router;