import { Router } from "express";
import { verifyJWT } from "../Middleware/Auth.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../Controllers/UserController.js";
import {
  createProduct,
  getallProducts,
  getsingleproduct,
  UpdateProduct,
  DeleteProduct,
} from "../Controllers/ProductController.js";
import {
  addtocart,
  GetCart,
  RemoveCartItem,
  DeleteCart,
} from "../Controllers/CartController.js";
import {
  createOrder,
  Getallorders,
  GetSingleOrder,
  UpdateOrder,
  DeleteOrder,
} from "../Controllers/order.js";
import {
  Payment,
  // GetPayment,
  // UpdatePayment,
  // DeletePayment,
} from "../Controllers/Payment.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refreshAccessToken").post(refreshAccessToken);

// // API IN product model

router.route("/createProduct").post(verifyJWT, createProduct);

router.route("/getallproducts").get(verifyJWT, getallProducts);

router.route("/getsingleproduct/:id").get(verifyJWT, getsingleproduct);

router.route("/UpdateProduct/:id").put(verifyJWT, UpdateProduct);

router.route("/DeleteProduct/:id").delete(verifyJWT, DeleteProduct);

// // API IN cart model

router.route("/addtocart/:id").post(verifyJWT, addtocart);

router.route("/GetCart").get(verifyJWT, GetCart);

router.route("/RemoveCartItem/:id").get(verifyJWT, RemoveCartItem);

router.route("/DeleteCart/:id").delete(verifyJWT, DeleteCart);

// // API IN order model

router.route("/createOrder").post(verifyJWT, createOrder);

router.route("/Getallorders").get(verifyJWT, Getallorders);

router.route("/GetSingleOrder/:id").get(verifyJWT, GetSingleOrder);

router.route("/UpdateOrder/:id").put(verifyJWT, UpdateOrder);

router.route("/DeleteOrder/:id").delete(verifyJWT, DeleteOrder);

// // API IN payment model

router.route("/payment").post(verifyJWT, Payment);

// router.route("/getpayment").get(verifyJWT, GetPayment);

// router.route("/updatepayment").put(verifyJWT, UpdatePayment);

// router.route("/deletepayment").delete(verifyJWT, DeletePayment);

export default router;
