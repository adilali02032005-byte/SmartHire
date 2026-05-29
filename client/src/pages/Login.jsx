import {useState} from "react";
import axios from "axios";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
                "http://localhost:5000/api/auth/login",
                formData
            );

            localStorage.setItem("token", res.data.token);

            window.location.href = "/";

            alert("Login successful");

            console.log(res.data);
        }catch(error){
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return(
        <div className="p-10">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 max-w-md"
            >
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
                    placeholder = "Password"
                    onChange={handleChange}
                    className="border p-2"
                />

                <button className="bg-black text-white p-2">
                    Login
                </button>

            </form>
        </div>
    );
}

export default Login;