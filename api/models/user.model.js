const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
     
    },
    avatar:{
        type:String,
        default:"https://mbde.ca/wp-content/uploads/2020/10/profil-vide.png",
     
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role'
    },

},{
    timestamps:true
})

module.exports = mongoose.model("User",UserSchema);