import {useEffect, useState} from "react";
import axios from "axios";

function MyApplications(){
    const [applications, setApplications] = useState([]);
    useEffect(() => {
        const fetchApplications = async() => {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                "http://localhost:5000/api/applications/my-applications",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setApplications(res.data);
        };
        fetchApplications();
    }, []);

    return(
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">
                My Applications
            </h1>
            <div className="flex flex-col gap-4">
                {applications.map((app)=>(
                    <div
                        key={app._id}
                        className="border p-4 rounded"
                    >
                        <h2 className="text-xl font-bold">
                            {app.jobId?.title}
                        </h2>
                        <p>{app.jobId?.company}</p>
                        <p>{app.jobId?.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyApplications;