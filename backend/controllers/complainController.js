import {supabase} from "../supabase.js"

export const createComplain=async(req,res)=>{
    try{
        const {student_id,name,room_no,description,complain_type,image_url}= req.body;
        if(!student_id || !room_no || !description || !complain_type ||!image_url ||!name)
        {
            return res.json({error:"Missing required fields"})
        }
        const {data,error}=await supabase.from('complaints').insert([{
            student_id,name,room_no,description,complain_type,image_url,status:'Pending'}
        ]).select();

        if(error)throw error;

        res.json({message:"Complain created",data})
        }
    catch(error){
        console.error("Backend Error:", error);
    res.json({ error: error.message })
    }
}