const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Reservation = sequelize.isDefined('Reservation') ? sequelize.models.Reservation : sequelize.define('Reservation', {
  reservation_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  reservation_date: { type: DataTypes.DATE, allowNull: false },
  reservation_time: { type: DataTypes.TIME, allowNull: false },
  party_size: { type: DataTypes.INTEGER, allowNull: false },
  special_requests: { type: DataTypes.TEXT, allowNull: true },
  status: {
    type: DataTypes.ENUM('confirmed', 'cancelled', 'completed'),
    defaultValue: 'confirmed'
  }
},  {
  tableName: 'reservations',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


module.exports = Reservation;