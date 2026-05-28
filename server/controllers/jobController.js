const Job = require("../models/Job");
const Application = require("../models/Application");

// create job
const createJob = async(req, res) => {
  try{
    const {title, description, company, location, salary, type} = req.body;

    const job = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      type,
      postedBy: req.user.id,
    });

    res.status(201).json(job);
  }catch(error){
    res.status(500).json({message: error.message});
  }
};

// get all jobs
const getJobs = async(req, res) => {
  try{
    const jobs = await Job.find().populate("postedBy", "name email");
    res.json(jobs);
  }catch(error){
    res.status(500).json({message: error.message});
  }
};

// get one job
const getJob = async(req, res) => {
  try{
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );
    if (!job){
      return res.status(404).json({message: "Job not found"});
    }
    res.json(job);
  }catch (error){
    res.status(500).json({message: error.message});
  }
};

const searchJobs = async(req, res) => {
  try{
    const{q} = req.query;
    const jobs = await Job.find({
      title: {$regex: q, $options: "i"},
    });
    res.json(jobs);
  }catch(error){
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRecruiterJobs = async(req, res) => {
  console.log(req.user);
  try{
    const jobs = await Job.find({
      postedBy: req.user.id.toString(),
    });
    
    const jobsWithCount = await Promise.all(
      jobs.map(async (job) => {
        const count = await Application.countDocuments({
          jobId: job._id,
        });
        return{
          ...job.toObject(),
          applicants: count,
        };
      })
    );

    res.json(jobsWithCount);
  }catch(error){
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateJob = async(req, res) => {
  try{
    const job = await Job.findById(req.params.id);

    if(!job){
      return res.status(404).json({message: "Job not found"});
    }
    const updated = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );

    res.json(updated);
  }catch(error){
    res.status(500).json({message: error.message});
  }
};

const deleteJob = async (req, res) => {
  try{
    const job = await Job.findById(req.params.id);

    if(!job){
      return res.status(404).json({message: "Job not found"});
    }
    await Job.findByIdAndDelete(req.params.id);
    res.json({message: "Job deleted successfully"});
  } catch(error){
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  createJob,
  getJobs,
  getJob,
  searchJobs,
  updateJob,
  deleteJob,
  getRecruiterJobs
};