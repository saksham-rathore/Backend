import { asynchandler } from "../Utils/asynchandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { ApiError } from "../Utils/ApiError.js";
import { User } from "../models/User.model.js";
import { Product } from "../models/Product.User.js";
import { Cart } from "../models/User.Cart.js";

const addtocart = asynchandler(async (req, res) => {
  const { id: productId } = req.params;
  const { Quantity } = req.body;
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  if (!productId || !Quantity) {
    throw new ApiError(400, "ProductId and Quantity are required");
  }

  if (Quantity <= 0) {
    throw new ApiError(400, "Quantity must be greater than 0");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const existingItem = await Cart.findOne({
    user: userId,
    "items.Product": productId,
  });

  if (existingItem) {
    // Product already in cart → quantity update
    await Cart.findOneAndUpdate(
      { user: userId, "items.Product": productId },
      { $inc: { "items.$.Quantity": Quantity } },
      { new: true },
    );
  } else {
    await Cart.findOneAndUpdate(
      { user: userId },
      { $push: { items: { Product: productId, Quantity: Quantity } } },
      { upsert: true, new: true },
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, Cart, "Product added to cart"));

  return res
    .status(200)
    .json(new ApiResponse(200, Cart, "Product added to cart"));
});

const GetCart = asynchandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId }).populate(
    "items.Product",
    "name price image",
  );

  if (!cart) {
    return res.status(200).json(new ApiResponse(200, [], "Cart is empty"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart fetched Successfully"));
});

const RemoveCartItem = asynchandler(async (req, res) => {
  const userId = req.user._id;
  const { id: productId } = req.params;

  if (!productId) {
    throw new ApiError(404, "Product not found");
  }

  const existingItem = await Cart.findOne({
    user: userId,
    "items.Product": productId,
  });

  if (!existingItem) {
    throw new ApiError(404, "Item not found in cart");
  }

  const updateCart = await Cart.findOneAndUpdate(
    { user: userId },
    {
      $pull: {
        items: { Product: productId },
      },
    },
    { new: true },
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updateCart, "Item removed from cart successfully"),
    );
});

const DeleteCart = asynchandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({
    user: userId,
  });

  if (!Cart) {
    throw new ApiError(404, "Cart not found");
  }

  await Cart.findOneAndDelete({
    user: userId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Cart deleted successfully"));
});

export { addtocart, GetCart, RemoveCartItem, DeleteCart };
