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
    .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT, () =>
            console.log(`Server running on http://localhost:${process.env.PORT}`)
        );
    })
    .catch((err) => console.error(err));