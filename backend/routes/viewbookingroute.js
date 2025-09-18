import { getBookings } from "../controllers/viewbookingController.js";
import { Router } from "express";

const viewbookingroute = Router()

viewbookingroute.get("/:user_id", getBookings)

export default viewbookingroute