const { Reservation } = require('../models');

// Helper function to convert 12-hour time (e.g. '4:00 PM') to 24-hour MySQL TIME (e.g. '16:00:00')
function convertToMySQLTime(twelveHourTime) {
  if (!twelveHourTime) return null;
  
  const [time, modifier] = twelveHourTime.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier.toUpperCase() === 'PM' && hours !== 12) {
    hours += 12;
  } else if (modifier.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }

  const hh = hours.toString().padStart(2, '0');
  const mm = minutes.toString().padStart(2, '0');

  return `${hh}:${mm}:00`;
}

const createReservation = async (req, res) => {
  try {
    const { reservation_date, reservation_time, party_size, special_requests } = req.body;
    const userId = req.user.userId;

    // Convert reservation_time to MySQL TIME format
    const mysqlTime = convertToMySQLTime(reservation_time);

    const newReservation = await Reservation.create({
      user_id: userId,
      reservation_date,
      reservation_time: mysqlTime,
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
