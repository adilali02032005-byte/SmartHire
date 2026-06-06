import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Applicants() {
  const { id: jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/applications/job/${jobId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setApplications(res.data);
      } catch (err) {
        console.log("FETCH ERROR:", err.response?.data || err.message);
      }
    };

    if (jobId) fetchApplicants();
  }, [jobId]);

  const shortlist = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/applications/shortlist/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setApplications((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status: "shortlisted" } : a
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const remove = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/applications/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setApplications((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Applicants</h1>

      {applications.length === 0 ? (
        <p>No applicants yet</p>
      ) : (
        applications.map((app) => (
          <div key={app._id} className="border p-4 mb-3 rounded">

            <p><b>{app.userId?.name}</b></p>
            <p>{app.userId?.email}</p>
            <p>Status: {app.status}</p>

            {app.userId?.resume ? (
              <a
                href={`${import.meta.env.VITE_API_URL}/uploads/${app.userId.resume}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline block mt-2"
              >
                View Resume
              </a>
            ) : (
              <p className="text-gray-400 mt-2">No resume uploaded</p>
            )}

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => shortlist(app._id)}
                className="bg-green-600 text-white px-3 py-1 cursor-pointer"
              >
                Shortlist
              </button>

              <button
                onClick={() => remove(app._id)}
                className="bg-red-600 text-white px-3 py-1 cursor-pointer"
              >
                Remove
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default Applicants;