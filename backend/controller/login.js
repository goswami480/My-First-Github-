const express=require("express")
const{ hasdhedpassword,comparepassword,regexemail}=require('../authservice')
// const SignUser=require('../model/signup')
const jwt=require('jsonwebtoken')


  const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        console.log("Request body",req.body)
        const user=await SignUser.findOne({email})
        console.log(user)
        if(!user) return res.status(400).json({message:"Invalid email or password"})
            const isMatch=await comparepassword(password,user.password)
        console.log("isMatch",isMatch)
            if(!isMatch) return res.status(400).json({message:"Invalid email or password"})
                const token=jwt.sign({
            id:user._id
        },"secretkeyappearshere",
        {expiresIn:"1h"});
        console.log("generated token",token)
        
        return res.status(200).send({token:token,message:"you are logged in successfully"});            

    }catch(err){
        console.error("Error during user creation:", err);
        return res.status(500).send("Internal server error")
    }

    
}

module.exports=login