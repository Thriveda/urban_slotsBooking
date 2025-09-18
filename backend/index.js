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

const app = express()
dotenv.config()

// ✅ Allowed origins for dev + prod
const allowedOrigins = [
  "http://localhost:5173",
  "https://urban-slots-booking.vercel.app"
]

// ✅ CORS setup
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman, curl)
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    } else {
      return callback(new Error("Not allowed by CORS"))
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

// ✅ Handle preflight requests
app.options("*", cors())

app.use(express.json())
app.use(bodyParser.json())

const port = process.env.PORT || 5000
const uri = process.env.MONGO_URI

async function start() {
  try {
    await connectdb(uri)
    app.listen(port, () => {
      console.log("✅ Server Started on port", port)
    })
  } catch (err) {
    console.log("❌ Connection failed")
    console.log(err)
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
