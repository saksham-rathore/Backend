import { asynchandler } from "../Utils/asynchandler";
import { User } from "../models/User.model";
import { Product } from "../models/Product.User";
import { ApiError } from "../Utils/ApiError";
import { ApiResponse } from "../Utils/ApiResponse";

const createProduct = asynchandler(async (req, res) => {
  const { Product, Price, Quantity } = req.body;

  if (!Product || !Price || !Quantity) {
    throw new ApiError(400, "All fields are required");
  }

  const newProduct = await Product.create({
    Product,
    Price,
    Quantity,
  });

  console.log("SAVED:", newProduct);
  const save = await newProduct.save();

  return res.status(201).json(new ApiResponse(201, save, "Product created"));
});

const getAllProducts = asynchandler(async (req, res) => {
  const Products = await ProductModel.find();

  if (Products.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "No products found"));
  }

  return res.status(200).json(new ApiResponse(200, Products, "All products"));
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
  GetAllProducts,
  GetSingleProduct,
  UpdateProduct,
  DeleteProduct,
};
