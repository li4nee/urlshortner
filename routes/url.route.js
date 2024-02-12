import express from "express";
import { generateNewUrl } from "../controllers/url.js";
import { Url } from "../models/url.model.js";
import { sendAnalytics } from "../controllers/url.js";
import { checkLogin } from "../middlewares/auth.js";
const router = express.Router();

router.route("/").post(checkLogin,generateNewUrl);

router.route("/analytics/:randomID").get(checkLogin,sendAnalytics);
export default router;