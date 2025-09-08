import { checkLogin } from "../controllers/loginController.js";
import { Router } from "express";

const loginroute = Router()

loginroute.post("/login", checkLogin)

export default loginroute