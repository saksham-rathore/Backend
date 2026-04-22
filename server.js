import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// ROUTING

app.post("/register", (req, res) => {
  const { username, email, Password } = req.body;

  res.json({
    message: "User registered successfully",
    data: { username, email },
  });
});

app.post("/login", (req, res) => {
  const { email, Password } = req.body;

  res.json({
    message: "User logged in successfully",
    data: { email, Password },
  });
});

app.post("/logout", (req, res) => {
  const { email, Password } = req.body;

  res.json({
    message: "User logged out successfully",
    data: { email },
  });
});

app.post("/refreshAccessToken", (req, res) => {
  const { email, Password } = req.body;

  res.json({
    message: "User logged out successfully",
    data: { email },
  });
});

app.post("/createProduct", (req, res) => {
  const { Product, Price, Quantity } = req.body;

  res.json({
    message: "Product created successfully",
    data: { Product, Price, Quantity },
  });
});

app.get("/getallproducts", (req, res) => {
  res.json({
    message: "All products fetched successfully",
    data: [],
  });
});

app.get("/getsingleproduct/:productId", (req, res) => {
  const { productId } = req.params;

  res.json({
    message: "Single product fetched successfully",
    data: { productId },
  });
});

app.patch("/updateproduct/:productId", (req, res) => {
  const { productId } = req.params;

  res.json({
    message: "Updated product successfully",
    data: { productId },
  });
});

app.delete("/deleteproduct/:productId", (req, res) => {
  const { productId } = req.params;

  res.json({
    message: "Deleted product successfully",
    data: { productId },
  });
});

app.post("/addtocart/:productId", (req, res) => {
  const { productId } = req.params;

  res.json({
    message: "Product added to cart successfully",
    data: { productId },
  });
});

app.get("/getcart/:productId", (req, res) => {
  const { productId } = req.params;

  res.json({
    message: "Cart fetched successfully",
    data: { productId },
  });
});

app.patch("/updatecart/:productId", (req, res) => {
  const { productId } = req.params;

  res.json({
    message: "Cart updated successfully",
    data: { productId },
  });
});

app.delete("/deletecart/:productId", (req, res) => {
  const { productId } = req.params;

  res.json({
    message: "delete Cart successfully",
    data: { productId },
  });
});

app.post("/createOrder", (req, res) => {
  const { Product, Price, Quantity } = req.body;

  res.json({
    message: "Order created successfully",
    data: { Product, Price, Quantity },
  });
});

app.get("/getallorders/:userId", (req, res) => {
  const { userId } = req.params;

  res.json({
    message: "All orders fetched successfully",
    data: { userId },
  });
});

app.get("/getsingleorder/:orderId", (req, res) => {
  const { orderId } = req.params;

  res.json({
    message: "Single order fetched successfully",
    data: { orderId },
  });
});

app.patch("/updateorder/:orderId", (req, res) => {
  const { orderId } = req.params;

  res.json({
    message: "order updated successfully",
    data: { orderId },
  });
});

app.delete("/deleteorder/:orderId", (req, res) => {
  const { orderId } = req.params;

  res.json({
    message: "order deleted successfully",
    data: { orderId },
  });
});

app.post("/payment/:orderId", (req, res) => {
  const { orderId } = req.params;

  res.json({
    message: "payment done successfully",
    data: { orderId },
  });
});

app.get("/getpayment/:orderId", (req, res) => {
  const { orderId } = req.params;

  res.json({
    message: "get payment successfully",
    data: { orderId },
  });
});

app.patch("/updatepayment/:orderId", (req, res) => {
  const { orderId } = req.params;

  res.json({
    message: "update payment successfully",
    data: { orderId },
  });
});

app.delete("/deletepayment/:orderId", (req, res) => {
  const { orderId } = req.params;

  res.json({
    message: "delete payment successfully",
    data: { orderId },
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
