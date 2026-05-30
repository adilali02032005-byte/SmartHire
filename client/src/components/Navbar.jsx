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
            
            {!token && (
                <Link to="/register">Register</Link>
            )}

            {token &&(
                <Link to="/jobs">Jobs</Link>
            )}
            
            {payload?.role === "recruiter" &&(
                <>
                    <Link to="/create-job">Post Job</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </>
            )}
            {payload?.role === "candidate" &&(
                <>
                    <Link to="/my-applications">My Applications</Link>
                    <Link to="/upload-resume">Upload Resume</Link>
                    <Link to="/ai-recommendations">AI Recommendations</Link>
                    <Link to="/profile">Profile</Link>
                </>
            )}
            {!token ?(
                <Link to="/login">Login</Link>
            ):(
                <button onClick={logout} className="cursor-pointer">
                    Logout
                </button>
            )}
        </nav>
    );
}

export default Navbar;