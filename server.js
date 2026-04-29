import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// import routes
import userRouter from './src/Router/UserRoute.js'

// routes declerations
app.use("/user", userRouter )

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  return res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
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
