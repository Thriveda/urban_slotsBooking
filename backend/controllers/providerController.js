import {Provider} from "../models/providersmodel.js";
import bcrypt from "bcrypt"

export const getRegisterProviders = async (req, res) => {
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

export const registerProvider = async (req, res) => {
    const {name, email, password, category, experience, price, phoneNo} = req.body
    try{
        const user = await Provider.findOne({email})
        if (user){
            res.send("User already exists")
        }
        else{ 
            const hashedPassword = await bcrypt.hash(password,6)

            const userDetails = {name, email, password:hashedPassword, category, experience, price, phoneNo}
            const addUser = new Provider(userDetails)
            await addUser.save()
            res.status(200).json({
                message: "Provider Registered Successfully"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:err
        })
    }
}

export const getProvidersList = async (req, res)=>{
    const {servicename} = req.params
    const list = await Provider.find({category: servicename})
    if (list){
        res.status(200).json({list})
    }
    res.status(500).json({
        
    })
}

export const getProviderDetails = async(req, res) => {
    const {category, providerId} = req.params
    try{
        const provider = await Provider.findById(providerId)
        if (!provider) {
            return res.status(404).json({ message: "Provider not found" });
        }

        return res.status(200).json({provider}); 
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
    
}