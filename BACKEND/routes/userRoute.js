const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");

// Register a new user
router.post("/signup", async (req, res) => {
    const { fullName, email, password, phoneNumber, address, userRole, agreementAccepted } = req.body;
  
    try {
      // Check if all required fields are provided
      if (!fullName || !email || !password || !phoneNumber || !address || !userRole || agreementAccepted === undefined) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user with structured address field
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword, // Save hashed password
        phoneNumber,
        address: {
          street: address.street,
          city: address.city,
          country: address.country,
        },
        userRole,
        agreementAccepted,
      });
  
      // Save the user to the database
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  });
  

// Login Route - User provides email and password to log in
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If credentials are correct, return user data (without password)
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Profile Route - No JWT (Anyone can access)
router.get("/profile", async (req, res) => {
  try {
    // For demonstration, we are directly getting a user by some known ID.
    // You may change this logic depending on your use case.
    const user = await User.findById("user_id_here").select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Send user data back
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
