import Router from "express";
import {confirmBooking,getBookingById,cancelBooking } from "../controllers/bookingController.js";

const bookingrouter = Router();

bookingrouter.post("/confirm", confirmBooking);
bookingrouter.get("/confirmation/:bookingId", getBookingById);
bookingrouter.post("/cancel/:bookingId", cancelBooking);
export default bookingrouter;