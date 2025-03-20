import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Changed to useNavigate

const LandForm = () => {
    const [landName, setLandName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [areaSize, setAreaSize] = useState("");
    const [soilType, setSoilType] = useState("");
    const [gemTypes, setGemTypes] = useState(""); // A string input, we will split it into an array
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert gemTypes to an array
        const gemTypesArray = gemTypes.split(",").map(item => item.trim());

        const newLand = {
            landName,
            latitude,
            longitude,
            areaSize,
            soilType,
            gemTypes: gemTypesArray,
            status
        };

        try {
            const response = await axios.post("http://localhost:5001/land/addLand", newLand);
            if (response.status === 201) {
                alert("Land added successfully");
                navigate("/home"); // Redirect to lands list page
            }
        } catch (error) {
            setError("Failed to add land. Please try again.");
            console.error("Error adding land:", error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Add New Land</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Land Name:</label>
                    <input 
                        type="text" 
                        value={landName} 
                        onChange={(e) => setLandName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Latitude:</label>
                    <input 
                        type="number" 
                        value={latitude} 
                        onChange={(e) => setLatitude(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Longitude:</label>
                    <input 
                        type="number" 
                        value={longitude} 
                        onChange={(e) => setLongitude(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Area Size:</label>
                    <input 
                        type="number" 
                        value={areaSize} 
                        onChange={(e) => setAreaSize(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Soil Type:</label>
                    <input 
                        type="text" 
                        value={soilType} 
                        onChange={(e) => setSoilType(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Gem Types (comma separated):</label>
                    <input 
                        type="text" 
                        value={gemTypes} 
                        onChange={(e) => setGemTypes(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <input 
                        type="text" 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <button type="submit">Add Land</button>
                </div>
            </form>
        </div>
    );
};

export default LandForm;
