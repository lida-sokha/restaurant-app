// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // In-house orders might not be tied to a logged-in user
  },
  table_number: {
    type: DataTypes.INTEGER,
    allowNull: true, // Optional for in-house ordering
  },
  order_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM('pending', 'preparing', 'served', 'completed', 'cancelled'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'orders',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Order;
