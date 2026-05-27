import {Navigate} from "react-router-dom";

function RecruiterRoute({children}){
    const token = localStorage.getItem("token");

    if(!token){
        return <Navigate to="/login" />;
    }

    const payload = JSON.parse(
        atob(token.split(".")[1])
    );

    if(payload.role!== "recruiter"){
        return <Navigate to="/" />;
    }

    return children;
}

export default RecruiterRoute;