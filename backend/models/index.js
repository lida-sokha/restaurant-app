// models/index.js
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
        rejectUnauthorized: false // Required for Railway to accept self-signed certs
      }
    },
    logging: false, // Set to true if you want to see raw SQL logs
  }
);

// Import your Menu model (and others if needed)
const Menu = require('./Menu')(sequelize, DataTypes);

// Test the DB connection immediately
sequelize.authenticate()
  .then(() => console.log('✅ Connected to Railway MySQL'))
  .catch(err => console.error('❌ Unable to connect to DB:', err));

// Export all models and sequelize instance
module.exports = {
  sequelize,
  Menu
};
