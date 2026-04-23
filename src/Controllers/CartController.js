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
    throw new ApiError(401, "User not authenticated")
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
    "items.Product": productId
  });

  if (existingItem) {
    existingItem.Quantity += Quantity;
    await existingItem.save();
  } else {

    // Create new cart with the item

    Cart = await Cart.create({
      user: userId,
      items: [{ Product: productId, Quantity: Number(Quantity) }],
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, Cart, "Product added to cart"));
});

export { addtocart };
