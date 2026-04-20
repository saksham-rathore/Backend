import { ApiError } from "../Utils/ApiError.js";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { asynchandler } from "../Utils/asynchandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const generateAccessRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validatebeforesave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "something went wrong");
  }
};

export const registerUser = asynchandler(async (req, res) => {
  const { username, email, Password } = req.body;

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
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

export const loginUser = asynchandler(async (req, res) => {
  const { email, Password, username } = req.body;

  if (!email && !username) {
    throw new ApiError(400, "bad request");
  }

  const UserFind = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!UserFind) {
    throw new ApiError(404, "User does not exist");
  }

  const PasswordValidation = await UserFind.ispasswordCorrect(Password);

  if (!PasswordValidation) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { refreshToken, accessToken } = await generateAccessRefreshToken(
    UserFind._id,
  );

  const loggedInUser = await User.findById(UserFind._id).select(
    "-Password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User loggedIn Successfully",
      ),
    );
});

const logoutUser = asynchandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshtoken: undefined,
      },
    },
    {
      new: true,
    },
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const refreshAccessToken = asynchandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
  
    const user = await User.findById(decodedToken?._id);
  
    if (!user) {
      throw new ApiError(401, "Invalid refresh Token");
    }
  
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }
  
    const options = {
      httpOnly: true,
      secure: true,
    };
  
    const {accessToken, newrefreshToken} = await generateAccessRefreshToken(user._id)
  
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiRsponse(
        200,
        {accessToken, newrefreshToken},
        "Access Token refreshed Successfully"
      )
    )
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh tokens")
  }
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
