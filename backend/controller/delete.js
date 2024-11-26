const User=require('../model/user')

const cut=async(req,res)=>{
    try{
        const id=req.params.id
        const user=await User.findByIdAndDelete(id)
        if(!user){
            return res.status(404).json({message:'User not found'})
            }
            res.status(200).json({message:'User deleted successfully'})
    }catch(err){
        console.log(err)
        res.status(500).json({message:err.message})
    }

};

module.exports=cut;