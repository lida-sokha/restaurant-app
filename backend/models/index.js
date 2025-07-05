// models/index.js (or db.js)
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');
require('dotenv').config(); // Ensure dotenv is configured if you're using .env for DB credentials

// Database configuration (replace with your actual credentials or use environment variables)
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  dialect: process.env.DB_DIALECT || 'mysql', 
  database: process.env.DB_NAME || 'restaurant_db',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'your_password', 
  logging: false, 
};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
  // pool: { // Optional: connection pool settings
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000
  // }
});

const db = {}; // This object will hold all your models

// Read all model files in the current directory and import them
// This assumes all your model definitions (like Menu.js) are in the same 'models' directory
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== path.basename(__filename) && // Exclude index.js itself
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // Import the model definition function and call it with sequelize and DataTypes
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model; // Store the defined model in the db object
  });

// Set up associations if you had multiple models (e.g., User.hasMany(Order))
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize; // Export the sequelize instance
db.Sequelize = Sequelize; // Export the Sequelize library itself

module.exports = db; // Export the db object containing all models and sequelize