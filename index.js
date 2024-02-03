import { Url } from "./models/url.model.js";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import path from "path";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
app.listen(8000, async (err) => {
  if (!err) {
    console.log(`Server started at PORT:${port}`);
  }
});

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false}));

import urlRoute from "./routes/url.route.js";
app.use("/url", urlRoute);

import randomIDRoute from "./routes/randomID.js";
app.use("/id", randomIDRoute);

app.get("/test", async (req, res) => {
  const allrandomID = await Url.find({});
  res.render("home",{
    ids:allrandomID
  })
});

import staticRouter from "./routes/staticrouter.js"

app.use("/",staticRouter)

connectDB(`${process.env.MONGO_URL}/${process.env.MONGO_COLLECTION}`)
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
