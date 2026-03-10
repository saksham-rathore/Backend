const User = require("../models/user-model.js");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

async function userRegister(req, res) {
  const { name, email, password } = req.body;

  const isExists = await User.findOne({ email });
  if (isExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await User.create({ name, email, password });
  res.status(201).json({ user });
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  name,
  email,
  password: hashedPassword,
});

module.exports = router;
