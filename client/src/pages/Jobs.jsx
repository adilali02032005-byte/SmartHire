import {useEffect, useState} from "react";
import axios from "axios";

function Jobs(){
    const [jobs, setJobs] = useState([]);
    const token = localStorage.getItem("token");
    const payload = token
        ? JSON.parse(atob(token.split(".")[1]))
        : null
    useEffect(() => {
        const fetchJobs = async() => {
            const res = await axios.get(
                "http://localhost:5000/api/jobs"
            );
            setJobs(res.data);
        };
        fetchJobs();
    }, []);

const applyJob = async(jobId) => {
    try{
        

        await axios.post(
            `http://localhost:5000/api/applications/${jobId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        alert("Applied successfully");
    }catch(error){
        console.log(error);
    }
};

return(
    <div className="p-10">

        <h1 className = "text-3xl font-bold mb-6">
            Jobs
        </h1>

        <div className="flex flex-col gap-4">
            {jobs.map((job) => (
                <div
                    key={job._id}
                    className="border p-4 rounded"
                >
                    <h2 className = "text-xl font-bold">
                        {job.title}
                    </h2>

                    <p>{job.company}</p>
                    <p>{job.location}</p>

                    {payload?.role === "candidate" && (
                        <button
                            onClick={() => applyJob(job._id)}
                            className="bg-black text-white px-4 py-2 mt-3 cursor-pointer"
                        >
                            Apply
                        </button>
                    )}
                </div>
            ))}
        </div>
    </div>
    );
}

export default Jobs;