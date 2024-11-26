const express=require("express");
const User=require("../model/user")

const getone=async(req,res)=>{
    const {email}=req.params
   try {
    const user=await User.findOne({email})
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    return res.status(200).json(user)
    }catch(err){
        return res.status(500).json({message:"Error fetching user"})
    }
}

module.exports=getone
