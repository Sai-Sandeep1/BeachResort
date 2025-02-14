// routes/userRoutes.js

const express = require('express');
const User = require('../models/User'); // Make sure the path is correct
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { name, mobile, age, password } = req.body;
  try {
    const newUser = new User({ name, mobile, age, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { mobile, password } = req.body;
  try {
    const user = await User.findOne({ mobile, password });
    if (user) {
      res.status(200).json({ message: 'Login successful!', userId: user._id });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
