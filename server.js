const express = require('express');
const connectDB = require('./src/config/db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('hello world');
});

// Database connection and server start
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed!", err);
    });