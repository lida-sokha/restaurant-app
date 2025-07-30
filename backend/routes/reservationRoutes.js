const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const ReservationController = require('../controllers/reservationController');

router.post('/', authenticateToken, ReservationController.createReservation);
router.get('/', authenticateToken, ReservationController.getAllReservations);

module.exports = router;
