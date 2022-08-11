const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    photo:{
        type:String,
        required:false
       
    },
    description:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    categories:{
        type:Array,
        ref:'Category',
        required:false   
    },
    likeCount:{
        type:Number,  
        default:0 
    },
    heartCount:{
        type:Number,  
        default:0 
    },
   


},{
    timestamps:true
})

module.exports = mongoose.model("Post",PostSchema);