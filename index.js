import { Url } from "./models/url.model.js";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import path from "path";
import cookieParser from "cookie-parser";
import {checkForAuthentication,restrictTo} from "./middlewares/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
app.listen(8000, async (err) => {
  if (!err) {
    console.log(`Server started at PORT:${port}`);
  }
});


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

import urlRoute from "./routes/url.route.js";
app.use("/url", restrictTo(["NORMAL","ADMIN"]), urlRoute);

import randomIDRoute from "./routes/randomID.js";
app.use("/id", randomIDRoute);


import staticRouter from "./routes/staticrouter.js";
app.use("/",staticRouter);

import signupLogin from "./routes/user.js";
app.use("/user", signupLogin);

connectDB(`${process.env.MONGO_URL}/${process.env.MONGO_COLLECTION}`)
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
