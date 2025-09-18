import {Slot} from "../models/slotmodel.js";


export const createSlot = async (req, res) => {
  try {
    const { providerId, startTime, endTime, price } = req.body;

    const check = await Slot.findOne({
      providerId,
      startTime,
      endTime
    });

    if (check && check.status === "hold") {
      return res.status(400).json({ message: "Slot is in hold" });
    }

    let slot;
    if (check) {
      check.status = "hold";
      slot = await check.save();
    } else {
      slot = await Slot.create({
        providerId,
        startTime,
        endTime,
        price,
        status: "hold"
      });
    }

    res.status(201).json(slot);
  } catch (error) {
    res.status(500).json({ message: "Error creating slot", message: error.message });
  }
}

export const getSlotsByProvider = async (req, res) => {
  try {
    const { providerId } = req.params;
    const slots = await Slot.find({ providerId });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: "Error fetching slots", error });
  }}