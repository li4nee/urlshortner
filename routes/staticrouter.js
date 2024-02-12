import express from "express";
import { Url } from "../models/url.model.js";
import { restrictTo } from "../middlewares/auth.js";

const router = express.Router();

router.route("/admin/url").get(restrictTo(["ADMIN"]),async (req, res) => {
  
  const allUrl = await Url.find({ });
  return res.render("home", { allUrl });
});


router.route("/").get(restrictTo(["NORMAL","ADMIN"]),async (req, res) => {
  
  const allUrl = await Url.find({ createdBy: req.user._id });
  return res.render("home", { allUrl });
});


router.route("/signup").get(async (req, res) => {
  return res.render("signup");
});

router.route("/login").get(async (req, res) => {
  return res.render("login");
});
export default router;
