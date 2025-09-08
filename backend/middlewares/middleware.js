import jwt from "jsonwebtoken"
import dotenv from "dotenv"

export const authMiddleware = async(req, res, next)=>{
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if (!token){
        res.status(400).json({
            message:"No token, Authorization denied"
        })
    }
    try{
    dotenv.config()
    const decoded = jwt.verify(token, process.env.SECRET_CODE)
    req.userEmail = decoded.email;
    next()
    }
    catch(err){
        res.status(500).json({err})
    }
}