import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/jobs/recruiter/jobs",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setJobs(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log(err);
        setJobs([]);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Recruiter Dashboard
      </h1>

      {jobs.map((job) => (
        <div key={job._id} className="border p-4 rounded mb-3">
          <h2 className="text-xl font-bold">{job.title}</h2>
          <p>{job.company}</p>
          <p>{job.location}</p>

          <p>Applicants: {job.applicants ?? 0}</p>

          <Link
            to={`/applicants/${job._id}`}
            className="bg-black text-white px-4 py-2 inline-block mt-2"
          >
            View Applicants
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;