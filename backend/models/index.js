const sequelize = require('../config/db');

const User = require('./User');
const MenuItem = require('./MenuItem');
const Reservation = require('./Reservation');
const Order = require('./order');
const OrderItem = require('./OrderItem');

// Define associations here
User.hasMany(Reservation, { foreignKey: 'user_id' });
Reservation.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

MenuItem.hasMany(OrderItem, { foreignKey: 'item_id' });
OrderItem.belongsTo(MenuItem, { foreignKey: 'item_id' });

module.exports = {
  sequelize,
  User,
  MenuItem,
  Reservation,
  Order,
  OrderItem,
};
