import { ApiError } from "../Utils/ApiError.js";
import { User } from "../models/User.model.js";
import { Jwt } from "jsonwebtoken";

export const registerUser = async (res, req) => {
  const { email, username, Password } = req.body;

  // check if Users exists
  if ([username, email, Password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findone({
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
