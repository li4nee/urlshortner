import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
    randomID:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    logHistory:[{
        visitedTime:{type:Number}
    }]
},{timestamps:true})

export const Url = mongoose.model("Url",urlSchema);