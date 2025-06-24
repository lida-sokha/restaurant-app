const express = require('express');
require('dotenv').config();
const app = express();
const { sequelize } = require('./models');

app.use(express.json());

// Route mounts
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
