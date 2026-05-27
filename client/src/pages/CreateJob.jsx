import {useState} from "react";
import axios from "axios"

function CreateJob(){
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
        type: "full-time",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:5000/api/jobs",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Job created");
        }catch(error){
            console.log(error);
        }
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
                    placeholder="Title"
                    onChange={handleChange}
                    className="border p-2"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    type="text"
                    name="salary"
                    placeholder="Salary"
                    onChange={handleChange}
                    className="border p-2"
                />

                <button className="bg-black text-white p-2">
                    Create Job
                </button>
            </form>
        </div>
    )
}
export default CreateJob;