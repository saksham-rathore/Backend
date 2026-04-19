import { ApiError } from "../Utils/ApiError";
import { asynchandler } from "../Utils/asynchandler";
import { User } from "../models/User.model";
import { ApiError } from "../Utils/ApiError";
import { Jwt } from "jsonwebtoken";

export const verifyJWT = asynchandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshtoken",
    );

    if (!User) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid Access Token");
  }
});
