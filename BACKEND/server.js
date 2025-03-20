const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());  // Parse JSON request bodies
app.use(cors());          // Enable Cross-Origin Resource Sharing

// Default API route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Import Routes
const landRouter = require("./routes/landRoute");
app.use("/land", landRouter);
const userRouter = require("./routes/userRoute");
app.use("/user", userRouter);

// Define Port & Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
