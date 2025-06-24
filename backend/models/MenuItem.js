const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MenuItem = sequelize.define('MenuItem', {
  item_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: {type: DataTypes.STRING(100), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  category: { type: DataTypes.STRING(50), allowNull: false },
  image_url: { type: DataTypes.STRING(255), allowNull: true },
  is_available: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
    tableName: 'menu_item',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
// models/MenuItem.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('MenuItem', {
    item_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'menu_item',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
};

module.exports = MenuItem;