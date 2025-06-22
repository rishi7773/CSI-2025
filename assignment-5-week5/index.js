require('dotenv').config();
console.log("MONGO_URI is:", process.env.MONGO_URI);


const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();




app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

app.post('/users', async(req, res) => {


    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        });

        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/users', async(req, res) => {
    const users = await User.find();
    res.send(users);
});


app.put('/users/:id', async(req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user);
});

app.delete('/users/:id', async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: 'User deleted' });
});

app.listen(3010, () => console.log('Server running on http://localhost:3010'));