const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');


router.post('/register', register); // registerUser must be a function
router.post('/login', login);

module.exports = router;
