import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function Applicants(){
    const [applications, setApplications] = useState([]);
    const {id} = useParams();
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Applicants;