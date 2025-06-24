const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./Order');
const MenuItem = require('./MenuItem');

const OrderItem = sequelize.define('OrderItem', {
  order_item_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price_at_order: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  special_requests: { type: DataTypes.TEXT }
}, {
  tableName: 'order_items',
  timestamps: false
});

OrderItem.belongsTo(Order, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Order.hasMany(OrderItem, { foreignKey: 'order_id' });

OrderItem.belongsTo(MenuItem, { foreignKey: 'item_id' });
MenuItem.hasMany(OrderItem, { foreignKey: 'item_id' });

module.exports = OrderItem;
