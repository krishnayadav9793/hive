import { supabase } from "../lib/supabase";
import React, { useEffect, useState } from "react";


const AddComplain=()=>{
    const[loading,setLoading]=useState(false)
    const [image, setImage] = useState(null);

    const [complain, setComplain]=useState({
        name:'',
        student_id:'',
        room_no:'',
        description:'',
        complain_type:'',
    })

    useEffect(()=>{
        const getUser=async()=>{
            const {data:{user}}=await supabase.auth.getUser();
            if(user){
                setComplain((prev)=>({...prev,student_id:user.id,name:user.user_metadata.name}))
            }
        };
        getUser();
    },[]);

    const handleChange=async (e)=>{
        setComplain({...complain,[e.target.name]:e.target.value})
    }
    const handleImageChange= (e)=>{
        setImage(e.target.files[0]);
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            let imageUrl="";
            if(image){
                const filePath=`complaints/${Date.now()}_${image.name}`
                const result = await supabase.storage.from("complain-images").upload(filePath,image);
                
                if(result.error) throw result.error;

                const {data}=supabase.storage.from("complain-images").getPublicUrl(filePath);

                imageUrl=data.publicUrl;
            }

        
            const payload ={...complain,image_url:imageUrl};
           
            const {
                data:{session},}=await supabase.auth.getSession();
            
                 const token = session?.access_token;

          const response =await axios.post(
                "./api/complain/complain_page",payload,{
          headers: {
          Authorization: `Bearer  ${token}`},
            });
        
           alert("Complaint Registered Successfully!");
        }
        catch(error){
           console.error("Error submitting complaint:", error);
           alert("Error: " + error.message);
        }
        finally {
            setLoading(false);
        }
    }
    
    return (
      <form
  onSubmit={handleSubmit}
  className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg space-y-4"
>
  <h2 className="text-2xl font-semibold text-gray-800 text-center">
    Register Complaint
  </h2>

  <input
    type="text"
    name="name"
    value={complain.name}
    onChange={handleChange}
    placeholder="Name"
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

  <input
    type="text"
    name="room_no"
    value={complain.room_no}
    onChange={handleChange}
    placeholder="Room No"
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

  <input
    type="text"
    name="complain_type"
    value={complain.complain_type}
    onChange={handleChange}
    placeholder="Complaint Type"
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

  <textarea
    name="description"
    value={complain.description}
    onChange={handleChange}
    placeholder="Describe your issue..."
    rows={4}
    className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />

  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">Upload Image (optional)</label>
    <input
      type="file"
      onChange={handleImageChange}
      className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                 file:rounded-lg file:border-0
                 file:text-sm file:font-medium
                 file:bg-blue-50 file:text-blue-600
                 hover:file:bg-blue-100"
    />
  </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full py-2 rounded-lg text-white font-medium
               bg-blue-600 hover:bg-blue-700
               disabled:opacity-50 disabled:cursor-not-allowed
               transition duration-200"
  >
    {loading ? "Submitting..." : "Submit Complaint"}
  </button>
</form>

  );
    
}
export default AddComplain;