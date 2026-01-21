import express from "express";
const port =3000;
const app= express()

app.get("/",(req,res)=>{
    res.send("Hello from the server")
})
app.listen(port,()=>{
    console.log("server started at 3000")
})