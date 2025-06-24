const { Order, OrderItem, MenuItem } = require('../models');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { user_id, items, delivery_address } = req.body; 
    // items: [{ item_id, quantity, special_requests }, ...]

    if (!items || !items.length) {
      return res.status(400).json({ message: "Order must include items." });
    }

    // Calculate total amount
    let total_amount = 0;
    for (const item of items) {
      const menuItem = await MenuItem.findByPk(item.item_id);
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item ${item.item_id} not found.` });
      }
      total_amount += menuItem.price * item.quantity;
    }

    // Create order
    const order = await Order.create({
      user_id,
      total_amount,
      delivery_address,
      status: 'pending',
    });

    // Create order items
    for (const item of items) {
      const menuItem = await MenuItem.findByPk(item.item_id);
      await OrderItem.create({
        order_id: order.order_id,
        item_id: item.item_id,
        quantity: item.quantity,
        price_at_order: menuItem.price,
        special_requests: item.special_requests || null,
      });
    }

    res.status(201).json({ message: "Order created successfully", order_id: order.order_id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all orders (optionally by user)
const getOrders = async (req, res) => {
  try {
    const { user_id } = req.query;
    const where = user_id ? { user_id } : {};

    const orders = await Order.findAll({
      where,
      include: [{
        model: OrderItem,
        include: [MenuItem],
      }],
      order: [['order_date', 'DESC']],
    });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  getOrders,
};
