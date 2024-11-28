const express=require("express");
const User=require("../model/user")
const get=async(req,res)=>{
 try{
  
   
    const user=await User.find()
    if(!user){
        return res.status(404).json({message:"No user found"})
    }
 
    const data=user.sort((a,b)=>{
        return b.createdAt-a.createdAt
    })
   return res.status(200).json({Users:data})
 }

 catch(err){
    res.status(500).json({message:err.message})

}}
module.exports=get;