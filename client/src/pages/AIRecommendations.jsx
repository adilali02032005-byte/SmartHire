import { useState } from "react";
import axios from "axios";

function AIRecommendations() {
  const [skills, setSkills] = useState("");
  const [jobs, setJobs] = useState([]);

  const applyJob = async (jobId) => {
    if (!jobId) {
      alert("Invalid job ID");
      return;
    }

    const token = localStorage.getItem("token");

    try {
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
    } catch (error) {
      console.log(error);
      alert("Failed to apply");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const jobRes = await axios.get(
        "http://localhost:5000/api/jobs"
      );

      const realJobs = jobRes.data || [];

      console.log("REAL JOBS:", realJobs);

      const aiRes = await axios.post(
        "http://localhost:5000/api/ai/recommend",
        {
          skills,
          jobs: realJobs,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const parsed = aiRes.data;

      console.log("PARSED:", parsed);

      const ranked = parsed.jobs
        .map((aiJob) => {
          const real = realJobs.find(
            (j) =>
              j.title?.toLowerCase() ===
              aiJob.title?.toLowerCase()
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
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        AI Job Recommendations
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md"
      >
        <textarea
          placeholder="Enter your skills"
          value={skills}
          onChange={(e) =>
            setSkills(e.target.value)
          }
          className="border p-2"
        />

        <button
          className="bg-black text-white p-2 cursor-pointer"
        >
          Get Recommendations
        </button>
      </form>

      <div className="mt-8 flex flex-col gap-4">
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

            <p className="mt-2">
              {job.reason}
            </p>

            <button
              className="mt-3 bg-black text-white px-4 py-2 cursor-pointer"
              onClick={() => applyJob(job._id)}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIRecommendations;