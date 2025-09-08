import mongoose from "mongoose";

export async function connectdb(uri){
    await mongoose.connect(uri)
    console.log("Mongo DB connected")
}