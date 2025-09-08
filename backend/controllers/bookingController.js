import {Booking} from "../models/bookingsmodel.js";
// import User from "../models/user.model.js";
// import Provider from "../models/provider.model.js";
import {Slot} from "../models/slotmodel.js";


// controller/booking.controller.js

export const confirmBooking = async (req, res) => {
  try {
    const { userId, providerId, slotId } = req.body;

    if (!userId || !providerId || !slotId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

  
    const slot = await Slot.findById(slotId);
    console.log("Slot before booking:", slot);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }
    if (slot.status === "booked") {
      return res.status(400).json({ message: "Slot already booked" });
    }

    slot.status = "booked";
    await slot.save();


    const booking = await Booking.create({
      userId,
      providerId,
      slotId,
      status: "confirmed"
    });

    
    const populatedBooking = await Booking.findById(booking._id)
      .populate("userId", "name email phone address")
      .populate("providerId", "name service")
      .populate("slotId");

    return res.status(201).json({
      message: "Booking confirmed successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key error (slot already booked by another user)
      return res.status(400).json({ message: "Slot already booked" });
    }
    console.error("Confirm booking error:", error);
    return res.status(500).json({ message: "Error confirming booking", error });
  }
};




export const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId)
      .populate("userId", "name email phone address")
      .populate("providerId", "name service")
      .populate("slotId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Get booking error:", error);
    res.status(500).json({ message: "Error fetching booking", error });
  }
};


export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    // free up slot
    await SlotModel.findByIdAndUpdate(booking.slotId, { isBooked: false });

    // update booking status
    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};