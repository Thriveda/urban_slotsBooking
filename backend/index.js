import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import registerroute from "./routes/registerroute.js"
import loginroute from "./routes/loginroute.js"
import providerroute from "./routes/providerroute.js"
import slotroute from "./routes/slotroute.js"

import { connectdb } from "./config/db.js"
import cors from "cors"
import bookingrouter from "./routes/bookingroute.js"

const app = express()
dotenv.config()
app.use(express.json());
app.use(cors())


const port = process.env.PORT || 5000
const uri = process.env.MONGO_URI

async function start(){
    try{
        await connectdb(uri)
        app.listen(port , ()=>{
        console.log("Server Started")
        })
    } catch(err){
        console.log("Connection failed")
        console.log(err)
    }
}
start()

app.use("/user", registerroute)
app.use("/user", loginroute)
app.use("/serviceprovider", providerroute)
app.use("/serviceprovider", slotroute)
app.use("/provider", slotroute)
app.use("/slot", bookingrouter)

