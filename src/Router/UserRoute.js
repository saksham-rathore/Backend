import {Router} from "express";
import { registerUser, loginUser, logoutUser } from "../Controllers/User.model.js";
import { verifyJWT } from "../Middleware/Auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser)

export default router