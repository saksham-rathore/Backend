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

const GetAllProducts = asynchandler(async (req, res) => {
  const Products = await ProductModel.find();

  return res.status(200).json(new ApiResponse(200, "All products"));
});

const GetSingleProduct = asynchandler(async (req, res) => {
  const Product = await ProductModel.findById(id);

  if (!Product) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(new ApiResponse(200, "Product found"));
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
}