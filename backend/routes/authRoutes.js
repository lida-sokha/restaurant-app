const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Import your Sequelize User model
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const SALT_ROUNDS = 10;

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new user
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password_hash: hashedPassword,
      phone
    });

    // Generate JWT token (optional)
    const token = jwt.sign(
      { userId: newUser.user_id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return response without password hash
    const userResponse = {
      user_id: newUser.user_id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      phone: newUser.phone,
      created_at: newUser.created_at
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userResponse,
      token
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router;