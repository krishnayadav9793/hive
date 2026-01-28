import express from "express";
import "./config.js"
import cors from 'cors'
import complainrouter from './routes/complainRoutes.js'
import dotenv from "dotenv"
import cors from 'cors'
import complainrouter from './routes/complainRoutes.js'
import hostelRouter from "./routes/hostel.js";
const PORT =process.env.PORT||3000;
const app= express()


app.use(cors());

app.use(express.json());
app.use('/api/complain',complainrouter)
app.use("/api/hostel",hostelRouter)

app.get("/",(req,res)=>{
    res.send("Hello from the server")
})
app.listen(PORT,()=>{
    console.log("server started at 3000")
})