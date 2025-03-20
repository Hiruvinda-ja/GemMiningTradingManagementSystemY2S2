import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LandDashboard from "./pages/landDashboard";
import LandForm from "./pages/LandForm";
import GetStartedPage from "./pages/GetStart";
import SignUpPage from "./pages/SignupPage";
import LogInPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import LandDetailsPage from "./pages/LandDetailsPage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/landDashboard" element={<LandDashboard />} />
        <Route path="/landform" element={<LandForm />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/landdetails/:id" element={<LandDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
