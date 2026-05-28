import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Dashboard(){
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const fetchJobs = async () => {
            try{
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    "http://localhost:5000/api/jobs/recruiter/jobs",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setJobs(res.data);
            }catch(error){
                console.log(error);
            }
        };
        fetchJobs();
    }, []);

    return(
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">
                Recruiter Dashboard
            </h1>

            <div className="flex flex-col gap-4">
                {jobs.map((job) => (
                    <div
                        key={job._id}
                        className="border p-4 rounded"
                    >

                        <h2 className="text-xl font-bond">
                            {job.title}
                        </h2>
                        <p>{job.company}</p>
                        <p>{job.location}</p>

                        <Link
                            to={`/applicants/${job._id}`}
                            className="bg-black text-white px-4 py-2 inline-block mt-3"
                        >
                            View Applicants
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;