import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
    name:{
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
    category:{
        type: String,
        required: true
    },
    experience:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    phoneNo:{
        type: Number,
        required: true
    } 
    
})

export const Provider = mongoose.model("providerDetails", providerSchema)