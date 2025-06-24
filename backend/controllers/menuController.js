const {MenuItem } = require('../models');   

const getAllMenuItems = async (req, res) => {
    const items = await MenuItem.findAll();
    res.json(items);
};

const getMenuItemById = async (req, res) => {
    const item = await MenuItem.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Menu item not found' });
  res.json(item);
}

const createMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.create(req.body);
        res.status(201).json(item);
    }catch (error) {
        console.error('Error creating menu item:', error);
        res.status(404).json({ message: 'Internal server error' });
    }
};

const updateMenuItem = async (req, res) => {
    const item = await MenuItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Menu item not found' });
    await item.update(req.body);
    res.json(item);
};

const deleteMenuItem = async (req, res) => {
    const item = await MenuItem.findByPk(req.params.id);
    if(!item) return res.status(404).json({ message: 'Menu item not found' });
    await item.destroy();
    res.status({message: 'Menu item deleted successfully' });
};
module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};