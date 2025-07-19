// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

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
        rejectUnauthorized: false // CRUCIAL for Railway
      }
    },
    logging: false,
  }
);

// Import models
const Menu = require('./menu')(sequelize, DataTypes);

// Export everything
module.exports = {
  sequelize,
  Menu
};
