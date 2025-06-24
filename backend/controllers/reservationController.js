const { Reservation } = require('../models');

const createReservation = async (req, res) => {
    try{
        const{reservation_date, reservation_time, party_size, special_requests} = req.body;
        const reservation = await Reservation.create({
            reservation_date,
            reservation_time,
            party_size,
            special_requests,
            user_id: req.user.user_id // Assuming user_id is available in req.user
        });
        res.status(201).json({ message: 'Reservation created successfully', reservation_id: reservation.reservation_id });
    }catch(error) {
       res.status(404).json({ message: 'Error creating reservation', error: error.message });
    }
};

const getMyReservations = async (req, res) => {
  const reservations = await Reservation.findAll({ where: { user_id: req.user.user_id } });
  res.json(reservations);
};

const cancelReservation = async (req, res) => {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation || reservation.user_id !== req.user.user_id)
    return res.status(403).json({ message: 'Not allowed' });

    await reservation.update({ status: 'cancelled' });
    res.json({ message: 'Cancelled' });

};
module.exports = {
  createReservation,
  getMyReservations,
  cancelReservation
};