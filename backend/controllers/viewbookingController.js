import { Booking } from "../models/bookingsmodel.js";

export const getBookings = async (req, res) => {
    const {user_id} = req.params
    try{
        const populatedBooking = await Booking.find({userId:user_id})
        .populate("userId")
        .populate("providerId", "name email phoneNo price category")
        .populate("slotId", "startTime");

        return res.status(201).json({
        booking: populatedBooking,
        });
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}