// middleware/isAdmin.js
const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.userId);

    if (!user || !user.is_admin) {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    next();
  } catch (err) {
    console.error('isAdmin middleware error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
