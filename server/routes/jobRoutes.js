const express = require("express");
const router = express.Router();
const roleCheck = require("../middleware/roleMiddleware");

const{
    createJob,
    getJobs,
    getJob,
    searchJobs,
    updateJob,
    deleteJob,
    getRecruiterJobs,
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");

//create job (protected)
router.post("/", protect, roleCheck("recruiter"),createJob);

//get all jobs
router.get("/", getJobs);

//search jobs
router.get("/search", searchJobs);

//get recruiter jobs
router.get(
    "/recruiter/jobs",
    protect,
    roleCheck("recruiter"),
    getRecruiterJobs
);

//get one job
router.get("/:id", getJob);

router.put("/:id", protect, roleCheck("recruiter"), updateJob);
router.delete("/:id", protect, roleCheck("recruiter"), deleteJob);

module.exports = router;