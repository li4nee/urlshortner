import express from "express";
import { Url } from "../models/url.model.js";
import { checkLogin } from "../middlewares/auth.js";
const router = express.Router();

router.route("/").get(async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
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
