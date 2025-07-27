// controllers/reservationController.js
const { Reservation } = require('../models');

const createReservation = async (req, res) => {
  try {
    const { reservation_date, reservation_time, party_size, special_requests } = req.body;
    const userId = req.user.userId;

    const newReservation = await Reservation.create({
      user_id: userId,
      reservation_date,
      reservation_time,
      party_size,
      special_requests,
    });

    res.status(201).json({ message: 'Reservation created', reservation: newReservation });
  } catch (error) {
    console.error('Create reservation error:', error);
    res.status(500).json({ message: 'Failed to create reservation' });
  }
};

module.exports = {
  createReservation,
};
