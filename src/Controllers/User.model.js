import { User } from "../models/User.model.js";
import { Jwt } from "jsonwebtoken";

export const registerUser = async (res, req) => {
    const {email, username, Password} = req.body;

    // check if Users exists
    if (
        [username, email, Password].some((field) =>
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findone({
        $or: [{username}, {email}],
    });

    if (existedUser) {
        throw new ApiError(400, "User already exists")
    }
    
}