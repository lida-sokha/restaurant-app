const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Sequelize User model

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const SALT_ROUNDS = 10;

/**
 * ===================== REGISTER =====================
 */
router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone } = req.body;

    if (!first_name || !last_name || !email || !password || !phone) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password_hash: hashedPassword,
      phone
    });

    const token = jwt.sign({ userId: newUser.user_id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        user_id: newUser.user_id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        phone: newUser.phone
      },
      token
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

/**
 * ===================== LOGIN =====================
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone
      },
      token
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

module.exports = router;
