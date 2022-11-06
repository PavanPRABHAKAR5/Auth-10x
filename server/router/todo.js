const express = require("express");
const cors = require("cors");
const route = express.Router();
route.use(express.json());
route.use(cors());
const todo =require("../Model/todo")



route.post("/", async(req,res)=>{
    try{
        const data=await task.create(req.body);
        res.status(200).json({
            status:"success",
            data:data
        })
    }catch(e){
        res.status(404).json({
            status:"failed",
            message:e.message
        })
    }
})
route.get("/", async(req,res)=>{
    try{
        const data=await task.find();
        res.status(200).json({
            status:"success",
            data:data
        })
    }catch(e){
        res.status(404).json({
            status:"failed",
            message:e.message
        })
    }
})

module.exports=route;
