import express from "express"

import { sendRandomID } from "../controllers/randomID.js";
const router = express.Router();

router.route("/:randomID").get(sendRandomID);

export default router;