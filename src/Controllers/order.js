import { ApiError } from "../Utils/ApiError.js";
import { User } from "../models/User.model.js";
import { Product } from "../models/Product.User.js";
import { Order } from "../models/Order.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asynchandler } from "../Utils/asynchandler.js";

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
    Address: address, // Matching model schema
    Payment,
    TotalPrice,
  });

  return res.status(201).json(new ApiResponse(201, order, "Order created"));
});

const Getallorders = asynchandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("items")
    .populate("Payment");
    
  return res.status(200).json(new ApiResponse(200, orders, "Orders fetched"));
});

const GetSingleOrder = asynchandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id)
    .populate("items")
    .populate("Payment");

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order fetched"));
});

const UpdateOrder = asynchandler(async (req, res) => {
  const { address, status } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (address) order.Address = address;
  if (status) order.Status = status;
  await order.save();

  return res.status(200).json(new ApiResponse(200, order, "Order updated"));
});

const DeleteOrder = asynchandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByIdAndDelete(id);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Order deleted"));
});

export {
  createOrder,
  Getallorders,
  GetSingleOrder,
  UpdateOrder,
  DeleteOrder,
};
