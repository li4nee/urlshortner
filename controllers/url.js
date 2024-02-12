import { nanoid } from "nanoid";
import { Url } from "../models/url.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { generateErrorResponse } from "../utils/apierror.js";

const generateNewUrl = asyncHandler(async (req, res) => {
  const randomID = nanoid(8);
  const { redirectURL } = req.body;
  if (!redirectURL) throw generateErrorResponse(400, "Empty URL to redirect");
  console.log("User ID before saving:", req.user._id);
  await Url.create({
    randomID,
    redirectURL,
    logHistory: [],
    createdBy: req.user._id,
  });
  const allUrl = await Url.find({ createdBy: req.user._id });
  return res.render("home", { randomID, allUrl });
});


const sendAnalytics = asyncHandler(async (req, res) => {
  const randomID = req.params.randomID;
  const info = await Url.findOne({ randomID });
  const visitedCount = await info.logHistory.length;
  return res.status(200).json({ visitedCount, analytics: info.logHistory });
});

export { generateNewUrl, sendAnalytics };
