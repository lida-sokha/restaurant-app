// models/menu.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Menu', {
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: DataTypes.STRING,
    image_url: DataTypes.STRING,
  }, {
    tableName: 'menu', // Match the table name in your DB
    timestamps: false  // Disable createdAt/updatedAt if not used
  });
};
