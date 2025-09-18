import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import registerroute from "./routes/registerroute.js"
import loginroute from "./routes/loginroute.js"
import providerroute from "./routes/providerroute.js"
import slotroute from "./routes/slotroute.js"
import viewbookingroute from "./routes/viewbookingroute.js"
import { connectdb } from "./config/db.js"
import cors from "cors"
import bookingroute from "./routes/bookingroute.js"

dotenv.config()
const app = express()

// ✅ Allowed origins (development + production)
const allowedOrigins = [
  "http://localhost:5173",
  "https://urban-slots-booking.vercel.app"
]

// ✅ CORS setup
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true) // Allow Postman, curl etc.
      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error("Not allowed by CORS"))
    },
    credentials: true, // ✅ allow cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)

// ✅ Preflight requests
app.options("*", cors())

// ✅ Middleware
app.use(express.json())
app.use(bodyParser.json())

const port = process.env.PORT || 5000
const uri = process.env.MONGO_URI

// ✅ Start server after DB connect
async function start() {
  try {
    await connectdb(uri)
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`)
    })
  } catch (err) {
    console.error("❌ DB Connection failed", err)
  }
}
start()

// ✅ Routes
app.use("/user", registerroute)
app.use("/user", loginroute)
app.use("/serviceprovider", providerroute)
app.use("/serviceprovider", slotroute)
app.use("/provider", slotroute)
app.use("/slot", bookingroute)
app.use("/viewbooking", viewbookingroute)

// ✅ Fallback route (to debug 404s)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" })
})
