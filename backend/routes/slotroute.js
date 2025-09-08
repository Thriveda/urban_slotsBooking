import { createSlot, getSlotsByProvider } from "../controllers/slotController.js";
import { Router } from "express";

const slotroute = Router();

slotroute.post("/createslot", createSlot);
slotroute.get("/:providerId", getSlotsByProvider);

export default slotroute;