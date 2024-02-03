import express from "express";
import { Url } from "../models/url.model.js";
const router = express.Router();

router.route("/").get(async(req,res)=>{
const allUrl =await Url.find({});
return res.render("home",{allUrl});
})

export default router;