const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const ReservationController = require('../controllers/reservationController');

router.post('/reservations', authenticateToken, ReservationController.createReservation);

module.exports = router;
