import { ApiError } from "../Utils/ApiError.js";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { asynchandler } from "../Utils/asynchandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

// create order
const createOrder = asynchandler(async (req, res) => {
  const { items, address, Payment, TotalPrice } = req.body;

  if (!items || items.length === 0) {
    throw new ApiError(400, "No items in order");
  }

  const Products = await Product.find({
    _id: { $in: items },
  });

  if (Products.length !== items.length) {
    throw new ApiError(404, "Some Product Not Found");
  }

  const order = await Order.create({
    user: req.user._id,
    items,
    address,
    Payment,
    TotalPrice,
  });

  return res.status(201).json({
    success: true,
    order,
  });
});

// get all orders
const Getallorders = asynchandler(async (req, res) => {
  const orders = await Order.find({ uesr: req.user._id })
    .populate("items")
    .populate("payments");
});

// get single order
const GetSingleOrder = asynchandler(async (req, res) => {
  const order = await order
    .findbyId(req.params.id)
    .populate("items")
    .populate("payments");

  if (!order) {
    throw new ApiError(404, "order not found");
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Update order
const UpdateOrder = asynchandler(async (req, res) => {
  const { address, status } = req.body;
  const order = await order.findbyId(req.params.id);

  if (!order) {
    throw new ApiError(404, "order not found");
  }

  if (address) order.address = address;
  if (status) order.status = status;
  await order.save();

  res.status(200).json({
    success: true,
    order,
  });
});
