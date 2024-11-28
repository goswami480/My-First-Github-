require('dotenv').config();
const express= require("express");
const app = express();
const mongoose=require("mongoose")
const router=require('./Routes/router')
const cors=require("cors");
const { configDotenv, config } = require("dotenv");
const port= process.env.PORT ;
const Mongo_URI=process.env.DB_URI


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({ origin: '*' }));
//database connection 
mongoose.connect(Mongo_URI)
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open",()=>{
    console.log("connected to database");

})
//routes
app.use("/",router)

app.use((err,req,res)=>{
    console.error(err.stack); 
    res.status(500).send({message:err.message})

})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
