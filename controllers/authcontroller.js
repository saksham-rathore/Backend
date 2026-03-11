const express = require("express");
const User = require("../models/user-model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

const userRegister = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const isExists = await User.findOne({ email });

    if (isExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { userid: user._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "3d" }
    );

    res.cookie("token", token, {
      httpOnly: true
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });

  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      message: error.message
    });
  }
};

router.post("/register", userRegister);

// user login controller
async function userLogincontroller(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }
    
    // Check if password exists in the request body
    if (!password) {
      return res.status(400).json({
         message: "Password is required"
      });
    }

    const isvalidPassword = await user.comparePassword(password);

    if (!isvalidPassword) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { userid: user._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "3d" }
    );

    res.cookie("token", token, {
      httpOnly: true
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: error.message
    });
  }
}

router.post("/login", userLogincontroller);

module.exports = router;