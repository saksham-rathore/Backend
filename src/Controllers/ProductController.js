import { asynchandler } from "../Utils/asynchandler.js";
import { User } from "../models/User.model.js";
import { Product } from "../models/Product.User.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { ProductModel } from "../models/Product.User.js";

const createProduct = asynchandler(async (req, res) => {
  const { product: ProductName, Price, Quantity } = req.body;

  if (!ProductName || !Price || !Quantity) {
    throw new ApiError(400, "All fields are required");
  }

  const newProduct = await Product.create({
    Product: ProductName,
    Price,
    Quantity,
  });

  const save = await newProduct.save();

  return res.status(201).json(new ApiResponse(201, save, "Product created"));
});

const getallProducts = asynchandler(async (req, res) => {
  const products = await Product.find();
  if (!products || products.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "No products found"));
  }
  return res.status(200).json(new ApiResponse(200, products, "All products"));
});

const getsingleproduct = asynchandler(async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(new ApiResponse(200, product, "Product found"));
});

const UpdateProduct = asynchandler(async (req, res) => {
  const { id } = req.params;

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    updatedProduct,
  });
});

const DeleteProduct = asynchandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await Product.findByIdAndDelete(id);

  if (!deleted) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Product deleted"));
});

export {
  createProduct,
  getallProducts,
  getsingleproduct,
  UpdateProduct,
  DeleteProduct,
};
