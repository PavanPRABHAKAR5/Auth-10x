const express=require('express');
const cors=require('cors');
const app=express();
const jwt =require('jsonwebtoken');
const secretKey="heythisissecretkey";
const user= require('./Model/User');
const port=process.env.PORT || 5000;



app.use(express.json());
app.use(cors());


const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://todo:todo@cluster0.mctgyi5.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("connected to db");
}).catch((e)=>{
    console.log("error in connection");
})


const userapi=require("./router/user");


app.use("/todolist",async (req,res,next)=>{
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token,secretKey);
        const userData = await user.findOne({_id:decoded.user});
        req.user = userData._id;
        next();
    }catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
})

app.use("/register",userapi);

app.listen(port,()=>{
    console.log("server is running at port "+port);
})