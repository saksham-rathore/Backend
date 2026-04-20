import { asynchandler } from "../Utils/asynchandler";
import { User } from "../models/User.model";
import { Product } from "../models/Product.User";
import { ApiError } from "../Utils/ApiError";
import { ApiResponse } from "../Utils/ApiResponse";

const createProduct = asynchandler(async (req, res) => {
    const {Product, Price, Quatity} = req.body;

    if (!Product || !Price || !Quatity) {
        throw new ApiError(400, "All fields are required");
    }
});