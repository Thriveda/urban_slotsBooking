import { getRegisterUsers, registerUser } from "../controllers/userController.js";
import { Router } from "express";

const registerroute = Router()


registerroute.get("/register", getRegisterUsers)
registerroute.post("/register", registerUser)
// registerroute.delete("/register", deleteRegisteredUser)

export default registerroute