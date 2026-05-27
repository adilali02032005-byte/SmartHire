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
      </Routes>
    </BrowserRouter>
  );
}
export default App;