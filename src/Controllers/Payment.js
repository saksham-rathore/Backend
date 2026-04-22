import { asynchandler } from "../Utils/asynchandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../models/User.model.js";
import { Payment } from "../models/Payment.js";
import { Order } from "../models/Order.js";

const CreatePayment = asynchandler(async (req, res) => {
  const { orderId, paymentId, amount, status } = req.body;

  if (!orderId || !paymentId || !amount || !status) {
    throw new ApiError(400, "All fields are required");
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.TotalPrice !== amount) {
    throw new ApiError(400, "Invalid payment amount");
  }

  const paymentInstance = await Payment.create({
    user: req.user._id,
    order: orderId,
    paymentId,
    amount,
    status,
    items: order.items[0], // Just an example, normally would link all items or specific ones
  });

  if (status === "success") {
    order.Status = "Paid";
    await order.save();
  }
  return res.status(201).json({
    success: true,
    Payment,
  });
});

export { CreatePayment as Payment };
