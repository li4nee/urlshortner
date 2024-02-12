import { asyncHandler } from "../utils/asynchandler.js";
import { Url } from "../models/url.model.js";
const sendRandomID = asyncHandler(async(req,res)=>{
    const randomID= req.params.randomID;
    const log=await Url.findOneAndUpdate({randomID},{
        $push:{logHistory:{visitedTime:Date.now()} }
    })
    res.redirect(log.redirectURL);
    })
export {sendRandomID};