import { asynchandler } from "../Utils/asynchandler";
import { User } from "../models/User.model";
import { Product } from "../models/Product.User";
import { ApiError } from "../Utils/ApiError";
import { ApiResponse } from "../Utils/ApiResponse";

const createProduct = asynchandler(async (req, res) => {
  const { Product, Price, Quatity } = req.body;

  if (!Product || !Price || !Quatity) {
    throw new ApiError(400, "All fields are required");
  }

  const newProduct = await ProductModel.create({
    Product,
    Price,
    Quatity,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newProduct, "Product created"));
});