import express from 'express';
import cookieParser from "cookie-parser";
import connectDB from './src/config/db.js';
import 'dotenv/config';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser());

app.post("/register", (req, res) => {
    const {username, email, Password} = req.body;

    res.json({
        message: "User registered successfully",
        data: {username, email}
    });
});

app.post("/login", (req, res) => {
    const {email, Password} = req.body;

    res.json({
        message: "User logged in successfully",
        data: {email, Password}
    });
});

app.post("/logout", (req, res) => {
    const {email, Password} = req.body;

    res.json({
        message: "User logged out successfully",
        data: {email}
    });
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