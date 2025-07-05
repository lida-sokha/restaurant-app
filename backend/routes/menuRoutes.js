const express = require('express');
const router = express.Router();
const { Menu } = require('../models');

// GET all menu items
router.get('/', async (req, res) => {
  try {
    const items = await Menu.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

module.exports = router;
