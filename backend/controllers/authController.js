const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { User } = require('../models');

// Helper function for error responses
const errorResponse = (res, status, message, error = null) => {
  const response = {
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && error && { error: error.stack })
  };
  return res.status(status).json(response);
};

// Auth Controller
const authController = {

  /**
   * Register a new user
   */
  register: async (req, res) => {
    const { first_name, last_name, email, password, phone } = req.body;

    try {
      // Validate input
      if (!first_name || !last_name || !email || !password || !phone) {
        return errorResponse(res, 400, 'All fields are required');
      }

      // Check if user exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return errorResponse(res, 409, 'Email already registered');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12); // Increased salt rounds

      // Create user
      const newUser = await User.create({
        first_name,
        last_name,
        email,
        password_hash: hashedPassword,
        phone
      });

      // Generate token immediately after registration
      const token = jwt.sign(
        { userId: newUser.user_id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
      );

      // Prepare response data
      const userData = {
        id: newUser.user_id,
        email: newUser.email,
        firstName: newUser.first_name,
        lastName: newUser.last_name
      };

      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        token,
        user: userData
      });

    } catch (error) {
      console.error('Registration error:', error);
      return errorResponse(res, 500, 'Registration failed', error);
    }
  },

  /**
   * Login existing user
   */
  login: async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured');
      throw new Error('Server configuration error');
    }

    // Find user
    const user = await User.findOne({
      where: { email: email.toLowerCase() },
      attributes: ['user_id', 'email', 'password_hash', 'first_name', 'last_name']
    });

    if (!user) {
      return errorResponse(res, 401, 'Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return errorResponse(res, 401, 'Invalid credentials');
    }

    // Generate token
    const token = jwt.sign(
      {
        userId: user.user_id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    // ✅ Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    // Send success response without exposing token
    const userData = {
      id: user.user_id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name
    };

    return res.json({
      success: true,
      message: 'Login successful',
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    return errorResponse(res, 500, 'Login failed', error);
  }
}
}
module.exports = authController;