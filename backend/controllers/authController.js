const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {User} = require('../models');

const register = async (req, res) => {
    try {
        const {email,password,first_name,last_name} = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
         const password_hash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password_hash, first_name, last_name });
        res.status(201).json({ message: 'Registered successfully', user_id: user.user_id });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }
        const match = await bcrypt.compare(password, user.password_hash);
        if(!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ user_id: user.user_id, is_admin: user.is_admin }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ message: 'Login successful', token });
    }catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = { register, login };