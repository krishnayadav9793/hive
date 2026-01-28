import { Router } from "express";
import  {supabase}  from "../supabase.js";
const hostelRouter = Router();
hostelRouter.get("/",async (req,res)=>{
    let data = await supabase
  .from("Hostel")
  .select()
  console.log(data)
  res.send(data)
          
})

hostelRouter.post("/",async (req,res)=>{
    const {Hostel_Name,Address,Owner_Name,Manager_Name,Owner_Number,Manager_Contact}=req.body
 console.log(Hostel_Name,Address,Owner_Name,Manager_Name,Owner_Number,Manager_Contact)
const { data, error } = await supabase
  .from('Hostel')
  .insert([
    { "Hostel Name": Hostel_Name, "Owner Name": Owner_Name,"Owner Number":Owner_Number,"Manager":Manager_Name,"Manager Number":Manager_Contact,"Address":Address },
  ])
  .select("*")
  console.log(data)
    res.send(data)  
})

export default hostelRouter;