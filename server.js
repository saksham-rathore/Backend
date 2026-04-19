import express from 'express';
import cookieParser from "cookie-parser";
import connectDB from './src/config/db.js';
import 'dotenv/config';

const app = express();

const port = process.env.PORT || 3000;

app.use(cookieParser());

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