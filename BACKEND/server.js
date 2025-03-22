require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");


// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

//connect investor routes
const investorRoutes = require("./Routes/investorRoutes");
app.use("/investor",investorRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));