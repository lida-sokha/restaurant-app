// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const isAdmin = require('../middleware/isAdmin');

router.get('/dashboard', authenticateToken, isAdmin, (req, res) => {
  res.json({ message: 'Welcome Admin, this is the dashboard' });
});

module.exports = router;