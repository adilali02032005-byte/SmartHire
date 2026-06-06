import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

function EditJob(){
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
    });

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async() => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/jobs/${id}`
            );
            setFormData(res.data);
        };
        fetchJob();
    }, [id]);

      const handleChange = (e) => {
            setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        await axios.put(
            `${import.meta.env.VITE_API_URL}/api/jobs/${id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        navigate("/dashboard");
    };

    return(
        <div className="p-10">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 max-w-md"
            >
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border p-2"
                />
                <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border p-2"
                />
                <input 
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="border p-2"
                />
                <input 
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="border p-2"
                />
                <input 
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="border p-2"
                />
                <button
                    className="bg-black text-white p-2"
                >
                    Update Job
                </button>
            </form>
        </div>
    );
}

export default EditJob;