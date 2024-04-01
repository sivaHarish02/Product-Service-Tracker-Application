const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Admin = mongoose.model("Admin")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();


// Endpoint to check for duplicate email or contact
router.post("/signup", async (req, res) => {
  console.log("sent by client - ", req.body);
  const { fullName, email, password, role ,contact, confirmPassword } = req.body;

  try {
    if (!fullName || !email || !contact || !password || !confirmPassword) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).json({ error: "Email Already Exists" });
    }

    const user = await User.findOne({ $or: [{ email }, { contact }] });
    
    if (user) {
      return res.status(400).json({ error: true, message: 'Email or contact already exists' });
    }

    const newUser = new User({
      email,
      fullName,
      password,
      role,
      contact,
      confirmPassword
    });

    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/adminsignup", async (req, res) => {
  console.log("sent by client - ", req.body);
  const { fullName, email, password, contact, confirmPassword } = req.body;

  try {
    if (!fullName || !email || !contact || !password || !confirmPassword) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    const existingUser = await Admin.findOne({ email });

    if (existingUser) {
      return res.status(422).json({ error: "Email Already Exists" });
    }

    const user = await Admin.findOne({ $or: [{ email }, { contact }] });
    
    if (user) {
      return res.status(400).json({ error: true, message: 'Email or contact already exists' });
    }

    const newUser = new Admin({
      email,
      fullName,
      password,
      contact,
      confirmPassword
    });

    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post('/adminsignin', async (req, res) => {
  console.log("sent by client - ", req.body);
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    const existingUser = await Admin.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/signin', async (req, res) => {
  console.log("sent by client - ", req.body);
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET);

    // Send token and user data to the client
    res.send({ user: existingUser });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
