import {Link} from "react-router-dom";

function Navbar(){

    const token = localStorage.getItem("token");
    const payload = token
        ? JSON.parse(atob(token.split(".")[1]))
        : null;

    const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
    };

    return(
        <nav className="flex gap-6 p-5 bg-black text-white">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/jobs">Jobs</Link>
            {payload?.role === "recruiter" &&(
                <>
                    <Link to="/create-job">Post Job</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </>
            )}
            {payload?.role === "candidate" &&(
                <>
                    <Link to="/my-applications">My Applications</Link>
                </>
            )}
            <button onClick = {logout}>
                Logout
            </button>
        </nav>
    );
}

export default Navbar;