const express = require('express');
const router = express.Router();
const {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');

const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/roleMiddleware');

// Public routes
router.get('/', getAllMenuItems);
router.get('/:id', getMenuItemById);

// Admin-only routes
router.post('/', auth, isAdmin, createMenuItem);
router.put('/:id', auth, isAdmin, updateMenuItem);
router.delete('/:id', auth, isAdmin, deleteMenuItem);

module.exports = router;
