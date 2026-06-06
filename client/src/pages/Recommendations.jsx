import { useEffect, useState } from "react";
import axios from "axios";

function Recommendations() {
    console.log("COMPONENT RENDERED");
  const [jobs, setJobs] = useState([]);

  const applyJob = async (jobId) => {
    if (!jobId) {
      alert("Invalid job ID");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/applications/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Applied successfully");
    } catch (err) {
      console.log("Apply error:", err.message);
      alert("Failed to apply");
    }
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem("token");

      try {
        const jobRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs`);
        const realJobs = jobRes.data.jobs || [];
        console.log("REAL JOBS:", realJobs);
        const aiRes = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/ai/recommend`,
          {
            skills: "React Node MongoDB",
            jobs: realJobs,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("AI RESPONSE:", aiRes.data.response);

        const cleaned = aiRes.data.response
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        const parsed = JSON.parse(cleaned);
        console.log("PARSED:", parsed);

        if (!parsed.jobs || parsed.jobs.length === 0) {
          setJobs([]);
          return;
        }

        const ranked = parsed.jobs
          .map((aiJob) => {
            const real = realJobs.find((j) =>
              j.title?.toLowerCase().includes(aiJob.title?.toLowerCase())
            );

            if (!real) return null;

            return {
              ...real,
              match: aiJob.match,
              reason: aiJob.reason,
            };
          })
          .filter(Boolean);
          console.log("RANKED:", ranked);

        setJobs(ranked);
      } catch (error) {
        console.log("Error:", error.message);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        Recommended Jobs
      </h1>

      <div className="flex flex-col gap-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border p-4 rounded shadow"
          >
            <h2 className="text-xl font-bold">
              {job.title}
            </h2>

            <span className="px-2 py-1 text-sm bg-gray-200 rounded">
              {job.match}
            </span>

            <p className="mt-2">{job.reason}</p>

            <button
              className="mt-3 bg-black text-white px-4 py-2 cursor-pointer"
              onClick={() => applyJob(job._id)}
              disabled={!job._id}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;