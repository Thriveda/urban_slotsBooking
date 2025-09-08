import { User } from "../models/usersmodel.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

export const checkLogin = async (req, res) => {
    const {email, password} = req.body
    dotenv.config()
    try{
        const check = await User.findOne({email})
    if (!check){
        return res.status(401).json({
            message: "Invalid Email"
        })
    }
    const hashedPassword = await bcrypt.compare(password, check.password)
    if (!hashedPassword){
        return res.status(401).json({
            message: "Inavlid Password"
        })
    }
    const jwtToken = jwt.sign({email, password}, process.env.SECRET_CODE, {expiresIn: "24h"})
    res.status(200).json({jwtToken, role:check.role, user:check})

    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}