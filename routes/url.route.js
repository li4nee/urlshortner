import express from "express";
import { generateNewUrl } from "../controllers/url.js";
import { Url } from "../models/url.model.js";
import { sendAnalytics } from "../controllers/url.js";
const router = express.Router();

router.route("/").post(generateNewUrl);

router.route("/analytics/:randomID").get(sendAnalytics);
export default router;