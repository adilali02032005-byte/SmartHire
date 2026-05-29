import {BrowserRouter, Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateJob from "./pages/CreateJob";
import Dashboard from "./pages/Dashboard";
import RecruiterRoute from "./components/RecruiterRoute";
import Applicants from "./pages/Applicants";
import EditJob from "./pages/EditJob";
import MyApplication from "./pages/MyApplications";
import UploadResume from "./pages/UploadResume";

function App(){
  return(
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-job"
          element={
            <RecruiterRoute>
              <CreateJob />
            </RecruiterRoute>
          }
          />
          <Route
            path="/dashboard"
            element={
              <RecruiterRoute>
                <Dashboard />
              </RecruiterRoute>
            }
          />
          <Route
            path="/applicants/:id"
            element={
              <RecruiterRoute>
                <Applicants />
              </RecruiterRoute>
            }
          />
          <Route 
            path="/edit-job/:id"
            element={
              <RecruiterRoute>
                <EditJob />
              </RecruiterRoute>
            }
          />
          <Route 
            path="/my-applications"
            element={
              <ProtectedRoute>
                <MyApplication />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload-resume"
            element={
              <ProtectedRoute>
                <UploadResume />
              </ProtectedRoute>
            }
          />
      </Routes>
    </BrowserRouter>
  );
}
export default App;