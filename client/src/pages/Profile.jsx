import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    education: "",
    skills: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/users/profile",
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
      "http://localhost:5000/api/users/profile",
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          placeholder="Name"
          className="border p-2"
        />

        <input
          value={form.phone || ""}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          placeholder="Phone"
          className="border p-2"
        />

        <input
          value={form.education || ""}
          onChange={(e) =>
            setForm({ ...form, education: e.target.value })
          }
          placeholder="Education"
          className="border p-2"
        />

        <input
          value={form.skills || ""}
          onChange={(e) =>
            setForm({ ...form, skills: e.target.value })
          }
          placeholder="Skills"
          className="border p-2"
        />

        <button
          type="submit"
          className="bg-black text-white p-2 cursor-pointer"
        >
          Save Profile
        </button>

      </form>
    </div>
  );
}

export default Profile;