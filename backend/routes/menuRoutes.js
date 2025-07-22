const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /api/menu
router.get('/', async (req, res) => {
  try {
    const menuItems = await db.Menu.findAll();
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

module.exports = router;