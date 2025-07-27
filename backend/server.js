require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const db = require('./models');
const menuRouter = require('./routes/menuRoutes');
const authRoutes = require('./routes/authRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 5000;

// ==================== CORS Setup ====================
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:5173'],
  credentials: true,
}));

// ==================== Middleware ====================
app.use(express.json());

// ==================== API Routes ====================
app.use('/api/menu', menuRouter); // use imported router

app.use('/api', authRoutes); // use auth routes

app.use('/api/reservations', reservationRoutes); // use reservation routes

app.use(cookieParser());

// ==================== Sequelize Setup ====================
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: process.env.NODE_ENV === 'production' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {},
    logging: false
  }
);

// ==================== DB Health Check ====================
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB:', sequelize.config.host);
    return true;
  } catch (err) {
    console.error(' DB connection failed:', err.message);
    return false;
  }
};

// ==================== Health Endpoint ====================
app.get('/health', async (req, res) => {
  const dbStatus = await testConnection();
  res.status(dbStatus ? 200 : 503).json({
    status: dbStatus ? 'healthy' : 'unhealthy'
  });
});

// ==================== Welcome Route ====================
app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant Backend API');
});

// ==================== Server Boot ====================
testConnection().then(success => {
  if (success) {
    db.sequelize.sync({ alter: process.env.NODE_ENV === 'development' })
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Server running at http://localhost:${PORT}`);
        });
      })
      .catch(err => console.error('Sequelize sync error:', err));
  } else {
    console.error('Could not start server. DB not connected.');
    process.exit(1);
  }
});
