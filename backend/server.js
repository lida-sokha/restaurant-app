require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const db = require('./models');
const menuRouter = require('./routes/menuRoutes'); // ✅ Fix: Import the router

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== Middleware Setup ====================
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// ==================== Routes ====================
// Remove the duplicate route and use this instead:
app.use('/api/menu', require('./routes/menuRoutes'));

// ==================== Sequelize Setup ====================
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
        rejectUnauthorized: false
      }
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    retry: {
      max: 3,
      match: [
        /ETIMEDOUT/,
        /ECONNRESET/,
        /ECONNREFUSED/,
        /SequelizeConnectionError/
      ]
    }
  }
);

// ==================== DB Health Check ====================
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected to:', sequelize.config.host);
    return true;
  } catch (error) {
    console.error('❌ Failed to connect to MySQL:', sequelize.config.host);
    console.error('Error:', error.message);
    return false;
  }
};

// ==================== Health Endpoint ====================
app.get('/health', async (req, res) => {
  const dbStatus = await testConnection();
  res.status(dbStatus ? 200 : 503).json({
    status: dbStatus ? 'healthy' : 'unhealthy',
    database: {
      host: sequelize.config.host,
      connected: dbStatus
    }
  });
});

// ==================== Fallback Route (Optional) ====================
app.get('/', (req, res) => {
  res.send("🚀 Welcome to the Restaurant Backend API");
});

// ==================== Server Boot ====================
testConnection().then(success => {
  if (success) {
    db.sequelize.sync({ alter: process.env.NODE_ENV === 'development' })
      .then(() => {
        app.listen(PORT, () => {
          console.log(`🚀 Server running on http://localhost:${PORT}`);
          console.log(`🔗 Connected to MySQL at ${sequelize.config.host}:${sequelize.config.port}`);
        });
      })
      .catch(err => console.error('❌ Sequelize sync failed:', err));
  } else {
    console.error('⛔ Server not started due to DB connection failure');
    process.exit(1);
  }
});
