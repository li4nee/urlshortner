import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../utils/settinguuid.js";
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = await req.body;
  await User.create({
    email,
    password,
    name,
  });
  return res
    .status(200)
    .render("login", { message: "Signup completed !! Please login" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } =  req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", { error: "Email or password incorrect" });
  } 
  const token = setUser(user);
  res.cookie("uid",token,{
    maxAge:3.6e+6
  });
  return res.status(200).redirect("/");
  
});
export { registerUser, loginUser };
