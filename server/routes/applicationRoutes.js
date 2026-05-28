const express = require("express");
const router = express.Router();

const {applyJob, getJobApplicants, deleteApplication} = require("../controllers/applicationController");
const protect = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleMiddleware");

//apply to job
router.post("/:id", protect, roleCheck("candidate"), applyJob);

//view candidates
router.get("/:id", protect, roleCheck("recruiter", "admin"), getJobApplicants);

//delete job
router.delete("/:id", protect, roleCheck("recruiter"), deleteApplication);

module.exports = router;