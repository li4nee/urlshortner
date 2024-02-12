import express from "express"

import { sendRandomID } from "../controllers/randomID.js";
import { checkLogin } from "../middlewares/auth.js";
const router = express.Router();

router.route("/:randomID").get(checkLogin,sendRandomID);

export default router;