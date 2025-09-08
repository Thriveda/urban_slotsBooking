import {User} from "../models/usersmodel.js";
import bcrypt from "bcrypt"

export const getRegisterUsers = async (req, res) => {
    try{
     const allRegisteredUser = await User.find()
     res.status(200).json({
        message:"Successfull",
        allRegisteredUser
     })
    }
    catch(err){
        res.status(500).json({err})
    }

}

export const registerUser = async (req, res) => {
    const {userName, email, password, phoneNo, role} = req.body
    try{
        const user = await User.findOne({phoneNo})
        if (user){
            res.status(401).json({message : "User already exists"})
        }
        else{ 
            const hashedPassword = await bcrypt.hash(password,6)

            const userDetails = {userName, email, password:hashedPassword, phoneNo, role}
            const addUser = new User(userDetails)
            await addUser.save()
            res.status(200).json({
                message: "Registered Successfully",
                userDetails
            })
        }
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
}