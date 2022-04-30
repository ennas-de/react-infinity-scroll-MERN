import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      password: hashedPass,
    });
    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (error) {
      res.status(400).json("Failed To Register New User!");
    }
  } catch (error) {
    res.status(500).json("Error Connecting To DB!");
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    try {
      const validateUser = await bcrypt.compare(
        req.body.password,
        user.password
      );
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(400).json("Invalid Username or Password!");
    }
  } catch (error) {
    res.status(404).json("User Not Found!");
  }
});

export default router;
