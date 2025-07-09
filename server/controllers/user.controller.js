const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET;

// Register User
async function registerUser(req, res) {
    try {
        const { businessName, ownerName, phoneNumber, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: 'User already exists.' });

        const newUser = new User({
            businessName,
            ownerName,
            phoneNumber,
            email,
            password,
        });

        await newUser.save();

        res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: newUser._id,
            uid: newUser.uid,
            email: newUser.email,
            businessName: newUser.businessName,
        },
        });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed', details: err.message });
    }
}


// Login User
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: 'user' }, JWT_SECRET, {
        expiresIn: '7d',
        });

        res.status(200).json({
        message: 'Login successful',
        token,
        user: {
            id: user._id,
            email: user.email,
            businessName: user.businessName,
        },
    });
    } catch (err) {
        res.status(500).json({ error: 'Login failed', details: err.message });
    }
}

// Get current user (auth required)
async function getCurrentUser(req, res) {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ error: 'Fetching user failed', details: err.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
};
