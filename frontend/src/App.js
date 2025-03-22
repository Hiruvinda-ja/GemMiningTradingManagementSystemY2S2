import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvestorManagement from "./pages/investorManagep";
import InvestorRegister from "./pages/investorRegister";
import AdminLogin from "./pages/adminLogin";
import AdminDashbord from "./pages/adminDashbord";
import Customer from "./pages/customer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/investormanagement" element={<InvestorManagement />} />
        <Route path="/investorregister" element={<InvestorRegister />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashbord" element={<AdminDashbord />} />
        <Route path="/customer" element={<Customer />} />
      </Routes>
    </Router>
  );
}

export default App;
