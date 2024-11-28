const express=require("express")
const router=express.Router()

const add=require('../controller/authcontoller')
const login=require('../controller/login')
const get=require('../controller/list')
const getone=require("../controller/getoneuser")
const update=require("../controller/update")
const cut=require("../controller/delete")
const adduser=require("../controller/signup")

router.post("/add",adduser)
router.post("/signup",add)
router.post("/login",login)
router.get("/allusers",get)
router.get("/getuser/:email",getone)
router.put("/updateuser/:id",update)
router.delete('/deleteuser/:id',cut)



module.exports=router