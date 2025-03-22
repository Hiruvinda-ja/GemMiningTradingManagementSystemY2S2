import React, { useState } from "react";
import "../style/adminlogin.css"; 
import { useNavigate } from "react-router-dom"; 

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle Input Changes
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle Login
  const handleSubmit = (e) => {
    e.preventDefault();

    const adminUser = {
      username: "admin",
      password: "123",
    };

    if (credentials.username === adminUser.username && credentials.password === adminUser.password) {
      alert("Login Successful!");
      navigate("/admindashbord"); // Redirect to the dashboard (change the route as needed)
    } else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
