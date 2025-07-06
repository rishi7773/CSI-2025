const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async(req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ id: user._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
        expiresIn: '2h'
    });
    res.json({ token });
});

module.exports = router;