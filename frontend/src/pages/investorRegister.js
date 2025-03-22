import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/investor.css"

function App() {
  const [investors, setInvestors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    funds: "",
    contact: "",
    address: "",
    image: "",
  });
  const [editingInvestor, setEditingInvestor] = useState(null);

  // Fetch all investors
  useEffect(() => {
    axios.get("http://localhost:5000/investor/display")
      .then((res) => setInvestors(res.data))
      .catch((err) => console.error("Error fetching investors:", err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update investor
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingInvestor) {
      // Update existing investor
      axios.put(`http://localhost:5000/investor/update/${editingInvestor._id}`, formData)
        .then((res) => {
          alert("Investor updated!");
          setEditingInvestor(null);
          setFormData({ name: "", funds: "", contact: "", address: "", image: "" });
          // Update the investors list
          setInvestors(investors.map((investor) => (investor._id === editingInvestor._id ? res.data : investor)));
        })
        .catch((err) => {
          console.error("Error updating investor:", err);
          alert("Error updating investor!");
        });
    } else {
      // Add new investor
      axios.post("http://localhost:5000/investor/add", formData)
        .then((res) => {
          alert("Investor added!");
          setFormData({ name: "", funds: "", contact: "", address: "", image: "" });
          // Add the new investor to the state
          setInvestors([...investors, res.data]);
        })
        .catch((err) => {
          console.error("Error adding investor:", err);
          alert("Error adding investor!");
        });
    }
  };

  // Delete an investor
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/investor/delete/${id}`)
      .then(() => {
        alert("Investor deleted!");
        setInvestors(investors.filter((investor) => investor._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting investor:", err);
        alert("Error deleting investor!");
      });
  };

  // Populate form for editing
  const handleEdit = (investor) => {
    setEditingInvestor(investor);
    setFormData(investor);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>New Investor Register</h2>

      {/* Form to Add or Update Investor */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="number" name="funds" placeholder="Funds" value={formData.funds} onChange={handleChange} required />
        <input type="number" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
        <button type="submit">{editingInvestor ? {/*"Update Investor" */}: "Add Investor"}</button>
      </form>

      {/* Investors Table */}
      {/*<table border="1" style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Funds</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {investors.map((investor) => (
            <tr key={investor._id}>
              <td>{investor.name}</td>
              <td>${investor.funds}</td>
              <td>{investor.contact}</td>
              <td>{investor.address}</td>
              <td>
                <button onClick={() => handleEdit(investor)}>Edit</button>
                <button onClick={() => handleDelete(investor._id)} style={{ marginLeft: "5px" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>*/}
    </div>
  );
}

export default App;
