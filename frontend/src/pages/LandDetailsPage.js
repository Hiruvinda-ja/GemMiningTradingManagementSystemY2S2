import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LandDetails = () => {
  const { id } = useParams(); // Get land ID from URL params
  const [land, setLand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLandDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/land/getLand/${id}`);
        setLand(response.data);
      } catch (err) {
        setError("Error fetching land details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLandDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!land) return <p>No land found.</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>{land.landName}</h2>
      <p><strong>Latitude:</strong> {land.latitude}</p>
      <p><strong>Longitude:</strong> {land.longitude}</p>
      <p><strong>Area Size:</strong> {land.areaSize} sq meters</p>
      <p><strong>Soil Type:</strong> {land.soilType}</p>
      <p><strong>Gem Types:</strong> {land.gemTypes}</p>
      <p><strong>Status:</strong> {land.status}</p>
    </div>
  );
};

export default LandDetails;
