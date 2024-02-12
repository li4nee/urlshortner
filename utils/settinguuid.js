import dotenv from "dotenv";
import { generateErrorResponse } from "./apierror.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "./asynchandler.js";
dotenv.config();

const secret = process.env.JWT_SECRET;

const setUser = (user) => {
  const signature = jwt.sign({ _id: user._id, email: user.email }, secret);
  return signature;
};

const getUser = async (token) => {
  if (!token) return null;
  try {
    const user = jwt.verify(token, secret);
    return user;
  } catch (err) {
    return null;
  }
};

export { setUser, getUser };
