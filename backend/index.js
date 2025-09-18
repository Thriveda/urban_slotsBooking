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


app.use(cors({
  origin: "http://localhost:5173",   
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}))


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
  if (req.method === "OPTIONS") {
    return res.sendStatus(200) 
  }
  next()
})

app.use(express.json())
app.use(bodyParser.json())

const port = process.env.PORT || 5000
const uri = process.env.MONGO_URI

async function start() {
  try {
    await connectdb(uri)
    app.listen(port, () => {
      console.log(" Server Started on port", port)
    })
  } catch (err) {
    console.log(" Connection failed")
    console.log(err)
  }
}
start()

app.use("/user", registerroute)
app.use("/user", loginroute)
app.use("/serviceprovider", providerroute)
app.use("/serviceprovider", slotroute)
app.use("/provider", slotroute)
app.use("/slot", bookingroute)
app.use("/viewbooking", viewbookingroute)
