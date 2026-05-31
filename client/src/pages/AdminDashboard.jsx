import {useEffect, useState} from "react";
import axios from "axios";

function AdminDashboard(){
    const [stats, setStats] = useState({});

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
        };
        fetchStats();
    }, []);
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
        </div>
    );
}
export default AdminDashboard;