// server.js (or wherever your main backend app is)
const express = require('express');
const cors = require('cors'); // For handling CORS policy
const db = require('./models'); // Your models/index.js file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for your frontend
app.use(express.json()); // To parse JSON request bodies

// API Route to get all menu items
app.get('/api/menu', async (req, res) => {
  try {
    const menuItems = await db.Menu.findAll(); // Fetch all items using your Menu model
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
});

// Start the server and sync database
db.sequelize.sync().then(() => { // sync() will create tables if they don't exist
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Database synced and connected.');
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});