import Router from "express";
import {confirmBooking,getBookedSlots,cancelBooking } from "../controllers/bookingController.js";

const bookingroute = Router();

bookingroute.post("/confirm", confirmBooking);
bookingroute.get("/:providerId", getBookedSlots);
bookingroute.post("/cancel/:bookingId", cancelBooking);
export default bookingroute;