import {supabase} from '../supabase.js'

 const authMiddleware =async (req,res,next)=>{
    try{
        const authHeader =req.headers.authorization;

        if(!authHeader){
            return res.json({error:"No token provided"})
        }
        const token =authHeader.split(' ')[1];

        const {data:{user},error}=await supabase.auth.getUser(token);
        
        if(error||!user){
            return res.json({error:"Unauthorized: Invalid or expired token"})
        }
        req.user=user;
        next();
    }
    catch(err){
        console.error("Auth Middleware Error:", err);
    res.json({ error: "Internal Server Error" });
  }
}
export default authMiddleware;