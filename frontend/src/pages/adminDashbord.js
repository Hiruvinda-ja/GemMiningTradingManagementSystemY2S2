import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/investortable.css";
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
      axios.put(`http://localhost:5000/investor/update/${editingInvestor._id}`, formData)
        .then((res) => {
          alert("Investor updated!");
          setEditingInvestor(null);
          setFormData({ name: "", funds: "", contact: "", address: "", image: "" });
          setInvestors(investors.map((investor) => (investor._id === editingInvestor._id ? res.data : investor)));
        })
        .catch((err) => {
          console.error("Error updating investor:", err);
          alert("Error updating investor!");
        });
    } else {
      axios.post("http://localhost:5000/investor/add", formData)
        .then((res) => {
          alert("Investor added!");
          setFormData({ name: "", funds: "", contact: "", address: "", image: "" });
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
    // <div>
    //   <h2>Investor Management</h2>

    //   <table>
    //     <thead>
    //         <tr>
    //         <th>Name</th>
    //         <th>Funds</th>
    //         <th>Contact</th>
    //         <th>Address</th>
    //         <th>Actions</th>
    //         </tr>
    //     </thead>
    //     <tbody>
    //         {investors.map((investor) => (
    //         <tr key={investor._id}>
    //             <td>{investor.name}</td>
    //             <td>${investor.funds}</td>
    //             <td>{investor.contact}</td>
    //             <td>{investor.address}</td>
    //             <td>
             
    //             <button style = {{background: "#dc3545",}} onClick={() => handleDelete(investor._id)}>Delete</button>
    //             {/* <button onClick={() => handleDelete(investor._id)}>Delete</button> */}
    //             </td>
    //         </tr>
    //         ))}
    //     </tbody>
    //     </table>

    // </div>

    <div style={{ marginTop: "40px", }}>
  <h2 style={{ textAlign: "center",  }}>Investor Management</h2>

  <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
    <thead>
      <tr style={{ background: "#f4f4f4", textAlign: "left" }}>
        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Funds</th>
        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Contact</th>
        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Address</th>
        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {investors.map((investor) => (
        <tr key={investor._id} style={{ borderBottom: "1px solid #ddd" }}>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>{investor.name}</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>Rs.{investor.funds}</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>{investor.contact}</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>{investor.address}</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>
            <button
              style={{
                background: "#dc3545",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
              onClick={() => handleDelete(investor._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}

export default App;
