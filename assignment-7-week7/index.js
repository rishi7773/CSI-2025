require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

mongoose
    .connect("mongodb+srv://appicleanimation:rishi420@cluster0.cjztx.mongodb.net/crud?retryWrites=true&w=majority")
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT, () =>
            console.log(`Server running on http://localhost:${process.env.PORT}`)
        );
    })
    .catch((err) => console.error(err));