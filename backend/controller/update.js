const User=require('../model/user');

const { hashedpassword,comparepassword,regexemail}=require('../authservice')

const update=async(req,res)=>{
    try{
    const {id}=req.params
    const update=req.body
    

    if(update.password){
        update.password=await hashedpassword(update.password)
    }
    
    if (update.email && !(await regexemail(update.email))) {
        return res.status(400).json({ message: "Invalid email format" });
      }
    console.log(update.password)
    
    const user=await User.findByIdAndUpdate(id,update,{new:true})
   
    if(!user){
        return res.status(404).json({message:'User not found'})
        }
        res.status(200).json({message:'User updated successfully',user})
}catch(err){
    res.status(500).json({message:'Error updating user',err})
}
}
module.exports=update