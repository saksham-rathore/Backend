import { asynchandler } from "../Utils/asynchandler.js";
import { User } from "../models/User.model.js";
import { Product } from "../models/Product.User.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

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

const getAllProducts = asynchandler(async (req, res) => {
  const Products = await ProductModel.find();

  if (products.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "No products found"));
  }

  return res.status(200).json(new ApiResponse(200, products, "All products"));
});

const getSingleProduct = asynchandler(async (req, res) => {
  const { id: productId } = req.params;
  const product = await ProductModel.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(new ApiResponse(200, product, "Product found"));
});

const UpdateProduct = asynchandler(async (req, res) => {
  const { id } = req.params;
  const Update = await ProductModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
});

const DeleteProduct = asynchandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await ProductModel.findByIdAndDelete(id);

  if (!deleted) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Product deleted"));
});

export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  UpdateProduct,
  DeleteProduct,
};
