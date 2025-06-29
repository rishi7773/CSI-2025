const users = require('../models/userModel');

exports.createUser = (req, res) => {
    const newUser = { id: Date.now().toString(), ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
};

exports.getUsers = (req, res) => {
    res.json(users);
};

exports.updateUser = (req, res) => {
    const id = req.params.id;
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users[index] = {...users[index], ...req.body };
        res.json(users[index]);
    } else {
        res.status(404).json({ error: "User not found" });
    }
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        const removedUser = users.splice(index, 1);
        res.json({ message: "User deleted", user: removedUser[0] });
    } else {
        res.status(404).json({ error: "User not found" });
    }
};