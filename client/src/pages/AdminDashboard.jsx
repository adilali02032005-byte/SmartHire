import {useEffect, useState} from "react";
import axios from "axios";

function AdminDashboard(){
    const [stats, setStats] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchStats = async() => {
            const token = localStorage.getItem("token");
            const res= await axios.get(
                "http://localhost:5000/api/admin/stats",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setStats(res.data);
            const usersRes = await axios.get(
                "http://localhost:5000/api/admin/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUsers(usersRes.data);
        };
        fetchStats();
    }, []);

    const deleteUser = async (id) => {
        try{
            const token = localStorage.getItem("token");

            if (!window.confirm("Delete this user?")) return;

            await axios.delete(
                `http://localhost:5000/api/admin/users/${id}`,
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            );

            setUsers((prev) =>
                prev.filter((user) => user._id !== id)
            );
            alert("User deleted successfully");
        }catch(error){
            alert(
                error.response?.data?.message ||
                "Failed to delete user"
            )
        }
    };

    return(
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">
                Admin Dashboard
            </h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="border p-4 rounded">
                    Users: {stats.totalUsers}
                </div>
                <div className="border p-4 rounded">
                    Recruiters: {stats.recruiters}
                </div>
                <div className="border p-4 rounded">
                    Candidates: {stats.candidates}
                </div>
                <div className="border p-4 rounded">
                    Jobs: {stats.jobs}
                </div>
                <div className="border p-4 rounded">
                    Applications: {stats.applications}
                </div>
            </div>
            <h2 className="text-2xl font-bold mt-8 mb-4">
                Users
            </h2>

            <div className="flex flex-col gap-3">
                {users.map((user) => (
            <div
                key={user._id}
                className="border p-4 rounded"
            >
                <p><b>{user.name}</b></p>
                <p>{user.email}</p>
                <p>Role: {user.role}</p>

                <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-600 text-white px-3 py-1 mt-2"
                >
                    Delete User
                </button>
            </div>
            ))}
            </div>
        </div>
    );
}
export default AdminDashboard;