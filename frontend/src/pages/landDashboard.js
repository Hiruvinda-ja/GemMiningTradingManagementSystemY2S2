import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LandList = () => {
    const [lands, setLands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize navigate

    // Fetch lands from backend
    useEffect(() => {
        axios.get("http://localhost:5001/land/getLand")
            .then((response) => {
                setLands(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching lands:", err);
                setError("Failed to load land data.");
                setLoading(false);
            });
    }, []);

    // Handle delete action
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5001/land/deleteLand/${id}`)
            .then((response) => {
                alert(response.data.message);
                setLands(lands.filter((land) => land._id !== id)); // Remove the deleted land from the list
            })
            .catch((err) => {
                console.error("Error deleting land:", err);
                alert("Failed to delete land");
            });
    };

    // Handle edit action
    const handleEdit = (id) => {
        alert(`Editing Land ID: ${id}`);
        // Navigate to an edit page if needed
    };

    //  Reusable navigation function
    const handleNavigate = (id) => {
        navigate(`/landdetails/${id}`); 
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Land List</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Land Name</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Area Size</th>
                        <th>Soil Type</th>
                        <th>Gem Types</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {lands.length > 0 ? (
                        lands.map((land) => (
                            <tr key={land._id}>
                                <td>{land.landName}</td>
                                <td>{land.latitude}</td>
                                <td>{land.longitude}</td>
                                <td>{land.areaSize}</td>
                                <td>{land.soilType}</td>
                                <td>{Array.isArray(land.gemTypes) ? land.gemTypes.join(", ") : land.gemTypes}</td>
                                <td>{land.status}</td>
                                <td>
                                    <button onClick={() => handleEdit(land._id)}>Edit</button>
                                    <button onClick={() => handleDelete(land._id)} style={{ marginLeft: "10px" }}>Delete</button>
                                    <button onClick={() => handleNavigate(land._id)} style={{ marginLeft: "10px" }}>View</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" style={{ textAlign: "center" }}>No Lands Found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LandList;
