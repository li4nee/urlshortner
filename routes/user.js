import express from "express";
import { loginUser, registerUser } from "../controllers/user.js";

const router = express.Router();

router.route("/signup").post(registerUser);

router.route("/signin").post(loginUser);

export default router;