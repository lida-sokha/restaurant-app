const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Order = sequelize.define('Order', {
  order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  delivery_address: { type: DataTypes.TEXT }
}, {
  tableName: 'orders',
  timestamps: true,
  createdAt: 'order_date',
  updatedAt: false
});

Order.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Order, { foreignKey: 'user_id' });

module.exports = Order;
