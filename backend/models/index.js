const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
  }
);

// Import all models
const Menu = require('./Menu')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes); 

 // Add this line
const Reservation = require('./reservation')(sequelize, DataTypes);
// Test the DB connection immediately
sequelize.authenticate()
  .then(() => console.log('✅ Connected to Railway MySQL'))
  .catch(err => console.error('❌ Unable to connect to DB:', err));

// Export all models and sequelize instance
module.exports = {
  sequelize,
  Menu,
  User,
  Reservation // Add this export
};