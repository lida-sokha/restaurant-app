module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER
  });

  
  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, { foreignKey: 'order_id' });
  };

  return OrderItem;
};
