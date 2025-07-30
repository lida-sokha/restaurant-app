module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    table_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  Order.associate = (models) => {
    Order.hasMany(models.OrderItem, { foreignKey: 'order_id' });
  };

  return Order;
};
