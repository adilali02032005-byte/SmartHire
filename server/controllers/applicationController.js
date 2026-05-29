const Application = require("../models/Application");

//apply for job
const applyJob = async(req, res) => {
    try{
        const jobId = req.params.id;
        const userId = req.user.id;

        //prevent duplicate applications
        const alreadyApplied = await Application.findOne({jobId, userId});

        if(alreadyApplied){
            return res.status(400).json({message: "Already applied"});
        }
        const application = await Application.create({
        jobId,
        userId,
    });

    res.status(201).json(application);
    }catch(error){
    res.status(500).json({message: error.message});
    }
};

//get applicants for a job
const getJobApplicants = async(req, res) => {
    try{
        const jobId = req.params.id;

        const applicants = await Application.find({jobId})
        .populate("userId", "name email")
        .populate("jobId", "title company");

        res.json(applicants);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

//delete an application
const deleteApplication = async(req, res) => {
    try{
        await Application.findByIdAndDelete(req.params.id);
        res.json({message: "Application removes"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

const getMyApplications = async(req, res) => {
    try{
        const applications = await Application.find({
            userId: req.user.id,
        }).populate("jobId");
        res.json(applications);
    }catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {applyJob, getJobApplicants, deleteApplication, getMyApplications,};