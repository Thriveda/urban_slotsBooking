import { getRegisterProviders, registerProvider, getProvidersList, getProviderDetails } from "../controllers/providerController.js";
import { Router } from "express";

const providerroute = Router()


providerroute.get("/register", getRegisterProviders)
providerroute.post("/register", registerProvider)
providerroute.get("/:servicename", getProvidersList)
providerroute.get("/:category/:providerId", getProviderDetails)
// registerroute.delete("/register", deleteRegisteredUser)

export default providerroute