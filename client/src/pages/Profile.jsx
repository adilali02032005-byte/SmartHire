import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    education: "",
    skills: "",
    resume: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setForm(res.data);
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/users/profile`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Profile updated");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        My Profile
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      <div className="flex flex-col gap-4">
          <input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            placeholder="Name"
            className="border p-3 rounded"
          />

          <input
            value={form.phone || ""}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            placeholder="Phone"
            className="border p-3 rounded"
          />

          <input
            value={form.education || ""}
            onChange={(e) =>
              setForm({ ...form, education: e.target.value })
            }
            placeholder="Education"
            className="border p-3 rounded"
          />

          <input
            value={form.skills || ""}
            onChange={(e) =>
              setForm({ ...form, skills: e.target.value })
            }
            placeholder="Skills"
            className="border p-3 rounded"
          />
      </div>

      <div className="flex flex-col gap-3 mt-4">
          <a
            href="/upload-resume"
            className="bg-black text-white px-4 py-2 inline-block mt-4 rounded"
          >
            Upload / Update Resume
          </a>
          <button
            type="submit"
            className="bg-black text-white p-2 cursor-pointer"
          >
            Save Profile
          </button>
          {form.resume && (
            <a
              href={`${import.meta.env.VITE_API_URL}/uploads/${form.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white p-2 inline-block mt-4 text-center"
            >
              View Resume
            </a>
          )}
          {!form.resume && (
            <p className="text-gray-500 mt-4">
              No resume uploaded
            </p>
          )}
      </div>
    </form>
    </div>
  );
}

export default Profile;