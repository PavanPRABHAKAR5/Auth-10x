const mongoose=require('mongoose');
const todoSchema=new mongoose.Schema({
    activity:{
        type:String,
        required:true,
        unique: true 
    }
})
const todo=mongoose.model("todo",taskSchema)
module.exports=todo
