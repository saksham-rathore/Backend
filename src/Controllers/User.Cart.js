import { asynchandler } from "../Utils/asynchandler";
import { ApiResponse } from "../Utils/ApiResponse";
import { ApiError } from "../Utils/ApiError";
import { User } from "../models/User.model";
import { Product } from "../models/Product.User";
import { Cart } from "../models/User.Cart";

const addtocart = asynchandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const userId = req.user._id;

  if (!productId || !quantity) {
    throw new ApiError(404, "ProductId or quantity is required");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  
});

export { addtocart };
