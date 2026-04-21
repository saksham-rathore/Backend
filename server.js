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

// ROUTING

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

app.post("/refreshAccessToken", (req, res) => {
    const {email, Password} = req.body;

    res.json({
        message: "User logged out successfully",
        data: {email}
    });
});

app.post("/createProduct", (req, res) => {
    const {Product, Price, Quatity} = req.body;

    res.json({
        message: "Product created successfully",
        data: {Product, Price, Quatity}
    });
});

app.post("/getallproducts", (req, res) => {
    const {Product, Price, Quatity} = req.body;

    res.json({
        message: "Product created successfully",
        data: {Product, Price, Quatity}
    });
});

app.post("/getsingleproduct", (req, res) => {
    const {Product, Price, Quatity} = req.body;

    res.json({
        message: "Product created successfully",
        data: {Product, Price, Quatity}
    });
});

app.post("/updateproduct", (req, res) => {
    const {Product, Price, Quatity} = req.body;

    res.json({
        message: "Product created successfully",
        data: {Product, Price, Quatity}
    });
});

app.post("/deleteproduct", (req, res) => {
    const {Product, Price, Quatity} = req.body;

    res.json({
        message: "Product created successfully",
        data: {Product, Price, Quatity}
    });
});

app.post("/addtocart", (req, res) => {
    const {Product, Price, Quatity} = req.body;

    res.json({
        message: "Product created successfully",
        data: {Product, Price, Quatity}
    });
});

app.post("/getcart", (req, res) => {
    const {Product, Price, Quatity} = req.body;

    res.json({
        message: "Product created successfully",
        data: {Product, Price, Quatity}
    });
});

app.post("/updatecart", (req, res) => {
    const {Product, Price, Quatity} = req.body;

    res.json({
        message: "Product created successfully",
        data: {Product, Price, Quatity}
    });
});

app.post("/deletecart", (req, res) => {
    const {Product, Price, Quatity} = req.body;

    res.json({
        message: "Product created successfully",
        data: {Product, Price, Quatity}
    });
});

app.post("/createOrder", (req, res) => {
    const {Product, Price, Quatity} = req.body;

    res.json({
        message: "Product created successfully",
        data: {Product, Price, Quatity}
    });
});

app.post("/getallorders", (req, res) => {
    const {Product, Price, Quatity} = req.body;

    res.json({
        message: "Product created successfully",
        data: {Product, Price, Quatity}
    });
});

app.post("/getsingleorder", (req, res) => {
    const {Product, Price, Quatity} = req.body;

    res.json({
        message: "Product created successfully",
        data: {Product, Price, Quatity}
    });
});

app.post("/updateorder", (req, res) => {
    const {Product, Price, Quatity} = req.body;

    res.json({
        message: "Product created successfully",
        data: {Product, Price, Quatity}
    });
});

app.post("/deleteorder", (req, res) => {
    const {Product, Price, Quatity} = req.body;

    res.json({
        message: "Product created successfully",
        data: {Product, Price, Quatity}
    });
});

app.post("/payment", (req, res) => {
    const {Product, Price, Quatity} = req.body;

    res.json({
        message: "Product created successfully",
        data: {Product, Price, Quatity}
    });
});

app.post("/getpayment", (req, res) => {
    const {Product, Price, Quatity} = req.body;

    res.json({
        message: "Product created successfully",
        data: {Product, Price, Quatity}
    });
});

app.post("/updatepayment", (req, res) => {
    const {Product, Price, Quatity} = req.body;

    res.json({
        message: "Product created successfully",
        data: {Product, Price, Quatity}
    });
});

app.post("/deletepayment", (req, res) => {
    const {Product, Price, Quatity} = req.body;

    res.json({
        message: "Product created successfully",
        data: {Product, Price, Quatity}
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