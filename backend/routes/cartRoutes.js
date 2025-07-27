// routes/cartRoutes.js
const express = require('express');
const router = express.Router();

// Example GET route for now
router.get('/', (req, res) => {
  res.json({ message: 'Cart route is working (example placeholder)' });
});

module.exports = router;
