const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const errorResponse = (res, status, message, error = null) => {
  const response = {
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && error && { error: error.stack })
  };
  return res.status(status).json(response);
};

const authController = {
  /**
   * Register a new user
   */
  register: async (req, res) => {
    const { first_name, last_name, email, password, phone } = req.body;

    try {
      if (!first_name || !last_name || !email || !password || !phone) {
        return errorResponse(res, 400, 'All fields are required');
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return errorResponse(res, 409, 'Email already registered');
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const isAdmin = email.toLowerCase() === 'admin@gmail.com';

      const newUser = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password_hash: hashedPassword,
        phone,
        is_admin: isAdmin
      });

      const token = jwt.sign(
        { userId: newUser.user_id, email: newUser.email, isAdmin },
        JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
      );

      const userData = {
        id: newUser.user_id,
        email: newUser.email,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        isAdmin: newUser.is_admin
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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const user = await User.findOne({
        where: { email: email.toLowerCase() },
        attributes: ['user_id', 'email', 'password_hash', 'first_name', 'last_name', 'is_admin']
      });

      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return errorResponse(res, 401, 'Invalid credentials');
      }

      const token = jwt.sign(
        {
          userId: user.user_id,
          email: user.email,
          isAdmin: user.is_admin
        },
        JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 60 * 60 * 1000 // 1 hour
      });

      const userData = {
        id: user.user_id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        isAdmin: user.is_admin
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
};

module.exports = authController;
