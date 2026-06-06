import {useEffect, useState} from "react";
import axios from "axios";

function Jobs(){
    const [jobs, setJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const token = localStorage.getItem("token");
    const payload = token
        ? JSON.parse(atob(token.split(".")[1]))
        : null
    useEffect(() => {
        const fetchJobs = async () => {
        try {
            const jobsRes = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/jobs`
            );

            setJobs(jobsRes.data);

            if (payload?.role === "candidate") {
                const appsRes = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/applications/my-applications`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                     }
                );

                const appliedIds = appsRes.data.map(
                    (app) => app.jobId?._id
                );

                setAppliedJobs(appliedIds);
                }
            } catch (error) {
                alert("Failed to load jobs");
            } 
        };
        fetchJobs();
    }, []);

const applyJob = async(jobId) => {
    try{
        await axios.post(
            `${import.meta.env.VITE_API_URL}/api/applications/job/${jobId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setAppliedJobs((prev) => [...prev, jobId]);
        alert("Applied successfully");
    }catch(error){
        alert(
            error.response?.data?.message ||
            "Failed to apply"
        );
    }
};

return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Jobs
      </h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500">
          No jobs available right now.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border p-4 rounded"
            >
              <h2 className="text-xl font-bold">
                {job.title}
              </h2>

              <p>{job.company}</p>
              <p>{job.location}</p>

              {job.type && (
                <p><b>Type:</b>{job.type}</p>
              )}

              {job.salary && (
                <p><b>Salary:</b>{job.salary}</p>
              )}

              {job.description && (
                <p className="text-sm text-gray-500 mt-2">{job.description}</p>
              )}

              {job.postedBy?.name && (
                <p className="text-sm text-gray-500 mt-2">Posted by: {job.postedBy.name}</p>
              )}

              {payload?.role === "candidate" &&
                (appliedJobs.includes(job._id) ? (
                  <button
                    disabled
                    className="bg-gray-500 text-white px-4 py-2 mt-3"
                  >
                    Applied
                  </button>
                ) : (
                  <button
                    onClick={() => applyJob(job._id)}
                    className="bg-black text-white px-4 py-2 mt-3 cursor-pointer"
                  >
                    Apply
                  </button>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;