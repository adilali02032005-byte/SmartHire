import {useState} from "react";
import axios from "axios";

function UploadResume(){
    const [file, setFile] = useState(null);
    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("resume", file);
        const token = localStorage.getItem("token");
        await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/upload-resume`,
            formData,

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            }
        );
        alert("Resume uploaded");
    };

    return(
        <div className="p-10">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
            >
                <input 
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="
                        border
                        p-2
                        rounded
                        cursor-pointer
                        file:cursor-pointer
                        file:bg-black
                        file:text-white
                        file:border-0
                        file:px-4
                        file:py-2
                        file:mr-4
                        file:rounded
                    "
                />
                <button className="bg-black text-white p-2 cursor-pointer">
                    Upload Resume
                </button>
            </form>
        </div>
    );
}

export default UploadResume;