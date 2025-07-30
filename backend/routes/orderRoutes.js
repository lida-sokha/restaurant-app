const express = require('express');
const router = express.Router();
const { Order, OrderItem } = require('../models');

// POST /api/orders
router.post('/', async (req, res) => {
  const { tableNumber, items, totalPrice } = req.body;

  if (!items || !Array.isArray(items) || !totalPrice) {
    return res.status(400).json({ message: 'Missing or invalid order data' });
  }

  try {
    const order = await Order.create({
      table_number: tableNumber,
      total_price: totalPrice,
    });

    const orderItems = await Promise.all(
      items.map((item) =>
        OrderItem.create({
          order_id: order.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })
      )
    );

    res.status(201).json({ message: 'Order placed successfully!', order: { ...order.toJSON(), items: orderItems } });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Failed to save order', error });
  }
});


module.exports = router;
    