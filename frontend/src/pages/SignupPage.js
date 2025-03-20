import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: { street: "", city: "", country: "" },
    userRole: "",
    agreementAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/user/signup", formData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <p><input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded" required /></p>
        <p><input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required /></p>
        <p><input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" required /></p>
        <p><input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded" required /></p>
        <p><input type="text" name="address.street" placeholder="Street" value={formData.address.street} onChange={handleChange} className="w-full p-2 border rounded" required /></p>
        <p><input type="text" name="address.city" placeholder="City" value={formData.address.city} onChange={handleChange} className="w-full p-2 border rounded" required /></p>
        <p><input type="text" name="address.country" placeholder="Country" value={formData.address.country} onChange={handleChange} className="w-full p-2 border rounded" required /></p>
        <select name="userRole" value={formData.userRole} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <br></br>
        <label className="flex items-center">
          <input type="checkbox" name="agreementAccepted" checked={formData.agreementAccepted} onChange={handleChange} className="mr-2" required />
          I accept the terms and conditions
          <br></br>
          <br></br>
        </label>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}
