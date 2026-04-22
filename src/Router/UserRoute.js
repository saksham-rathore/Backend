import { Router } from "express";
import { verifyJWT } from "../Middleware/Auth.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../Controllers/UserController.js";
// import {
//   createProduct,
//   GetAllProducts,
//   GetSingleProduct,
//   UpdateProduct,
//   DeleteProduct,
// } from "../Controllers/Product.user.js";
// import {
//   addtocart,
//   GetCart,
//   UpdateCart,
//   DeleteCart,
// } from "../Controllers/Cart.user.js";
// import {
//   createOrder,
//   Getallorders,
//   GetSingleOrder,
//   UpdateOrder,
//   DeleteOrder,
// } from "../Controllers/Order.user.js";
// import {
//   Payment,
//   GetPayment,
//   UpdatePayment,
//   DeletePayment,
// } from "../Controllers/Payment.user.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser)

// router.route("/refreshAccessToken").post(refreshAccessToken)

// // API IN product model

// router.route("/createProduct").post(verifyJWT, createProduct)

// router.route("/getallproducts").get(verifyJWT, GetAllProducts)

// router.route("/getsingleproduct").get(verifyJWT, GetSingleProduct)

// router.route("/updateproduct").put(verifyJWT, UpdateProduct)

// router.route("/deleteproduct").delete(verifyJWT, DeleteProduct)

// // API IN cart model

// router.route("/addtocart").post(verifyJWT, addtocart)

// router.route("/getcart").get(verifyJWT, GetCart)

// router.route("/updatecart").put(verifyJWT, UpdateCart)

// router.route("/deletecart").delete(verifyJWT, DeleteCart)

// // API IN order model

// router.route("/createOrder").post(verifyJWT, createOrder)

// router.route("/getallorders").get(verifyJWT, Getallorders)

// router.route("/getsingleorder").get(verifyJWT, GetSingleOrder)

// router.route("/updateorder").put(verifyJWT, UpdateOrder)

// router.route("/deleteorder").delete(verifyJWT, DeleteOrder)

// // API IN payment model

// router.route("/payment").post(verifyJWT, Payment)

// router.route("/getpayment").get(verifyJWT, GetPayment)

// router.route("/updatepayment").put(verifyJWT, UpdatePayment)

// router.route("/deletepayment").delete(verifyJWT, DeletePayment)

export default router