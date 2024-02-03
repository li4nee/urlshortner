import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = await req.body;
  await User.create({
    email,
    password,
    name,
  });
  return res.status(200).render("login");
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = await req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", { error: "Email or password incorrect" });
  }
  else{
    return res.status(200).render("home");
  }
});
export { registerUser, loginUser };
