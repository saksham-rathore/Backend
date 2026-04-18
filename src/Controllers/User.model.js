import { ApiError } from "../Utils/ApiError.js";
import { User } from "../models/User.model.js";
import { Jwt } from "jsonwebtoken";
import { asynchandler } from "../Utils/asynchandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

export const registerUser = asynchandler(async (req, res) => {

  // check if Users exists
  if ([username, email, Password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    username,
    email,
    Password,
  });

  const createdUser = await User.findById(user._id).select(
    "-Password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
  }

  return res
  .status(201)
  .json(new ApiResponse(200, createdUser, "User registered Successfully"));
};

export const loginUser = asynchandler(async (req, res) => {
    const { email, Password } = req.body

    // if ([email, Password])
})

export { registerUser, loginUser }