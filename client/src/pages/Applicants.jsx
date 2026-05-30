import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function Applicants(){
    const [applications, setApplications] = useState([]);
    const {id} = useParams();

    const shortlist = async (applicationId) => {
        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/api/applications/shortlist/${applicationId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Candidate shortlisted");

            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchApplicants = async () => {
            try{
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    `http://localhost:5000/api/applications/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setApplications(res.data);
            }catch(error){
                console.log(error);
            }
        };

        fetchApplicants();
    }, [id]);

    return(
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">
                Applicants
            </h1>

            <div className="flex flex-col gap-4">
                {applications.map((app) => (
                    <div
                        key={app._id}
                        className="border p-4 rounded"
                    >
                        <p>{app.userId?.name}</p>
                        <p>{app.userId?.email}</p>
                        <p className="mt-2">Status: {app.status}</p>
                        <a
                            href={`http://localhost:5000/${app.userId.resume}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 mr-2"
                            >
                            View Resume
                        </a>

                        <button
                            onClick={async () => {
                                const token = localStorage.getItem("token");

                                await axios.put(
                                `http://localhost:5000/api/applications/shortlist/${app._id}`,
                                {},
                                {
                                    headers: {
                                    Authorization: `Bearer ${token}`,
                                    },
                                }
                                );
                                window.location.reload();
                            }}
                            className="bg-green-600 text-white px-3 py-1 mt-2 mr-2 cursor-pointer"
                        >
                            Shortlist
                        </button>

                        <button
                            onClick={async() => {
                                const token=localStorage.getItem("token");
                                await axios.delete(
                                    `http://localhost:5000/api/applications/${app._id}`,
                                    {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    }
                                );
                                window.location.reload();
                            }}
                            className="bg-red-600 text-white px-3 py-1 mt-2 cursor-pointer"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Applicants;