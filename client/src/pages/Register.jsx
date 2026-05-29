import {useState} from "react";
import axios from "axios";

function Register(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "candidate",
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
        const res = await axios.post(
            "http://localhost:5000/api/auth/register",
            formData
        );

        localStorage.setItem("token", res.data.token);

        console.log(res.data);

        alert("Registered succeffully");
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
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="border p-2"
                />

                <select
                    name="role"
                    onChange={handleChange}
                    className="border p-2 cursor-pointer"
                >
                        <option value="candidate">Candidate</option>
                        <option value="recruiter">Recruiter</option>
                    </select>

                    <button className="bg-black text-white p-2 cursor-pointer">
                        Register
                    </button>
            </form>
    </div>
    );
}
export default Register
