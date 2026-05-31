import {Link, Navigate} from "react-router-dom";
function Home(){
    const token = localStorage.getItem("token");
    const user=token
        ? JSON.parse(atob(token.split(".")[1]))
        : null;
    if(user?.role === "admin"){
        return<Navigate to="/admin" />;
    }

    return(
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-5xl font-bold mb-4">
                SmartHire
            </h1>
            <p className="text-xl text-gray-500 mb-4">
                AI Powered Job Portal
            </p>
            <p className="max-w-xl text-gray-500 mb-8">
                Connect candidates with recruiters through intelligent job recommendations and modern hiring tools.
            </p>
            {!user && (
                <div>
                    <Link
                        to="/login"
                        className="bg-black text-white px-6 py-3 rounded"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="border px-6 py-3 rounded"
                    >
                        Register
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Home;