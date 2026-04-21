import { asynchandler } from "../Utils/asynchandler";
import { ApiError } from "../Utils/ApiError";
import { ApiResponse } from "../Utils/ApiResponse";
import { User } from "../models/User.model";
import { Payment } from "../models/Payment";

const Payment = asynchandler(async (req, res) => {
  const { orderId, paymentId, amount, status } = req.body;

  if (!orderId || !paymentId || !amount || !status) {
    throw new ApiError(400, "All fields are required");
  }

  const order = await Order.findbyId(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.TotalPrice !== amount) {
    throw new ApiError(400, "Invalid payment method");
  }

  const Payment = await PaymentModel.create({
    orderId,
    paymentId,
    amount,
    status,
  });

  if (status === "success") {
    order.status = "Paid";
    await order.save();
  }
  return res.status(201).json({
    success: true,
    payment,
  });
});

export {
    Payment
}