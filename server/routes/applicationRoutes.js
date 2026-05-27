const express = require("express");
const router = express.Router();

const {applyJob, getJobApplicants} = require("../controllers/applicationController");
const protect = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleMiddleware");

//apply to job
router.post("/:id", protect, roleCheck("candidate"), applyJob);

//view candidates
router.get("/:id", protect, roleCheck("recruiter", "admin"), getJobApplicants);

module.exports = router;