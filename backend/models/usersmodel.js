import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        lowercase: true,
        unique: true
    }, 
    password:{
        type: String,
        required: true
    },
    phoneNo:{
        type: String,
        required: true,
        unique:true
    },
    role:{
        type: String,
        required: true
    } 
    
})

export const User = mongoose.model("registerDetails", registerSchema)