const UserSchema = require('../models/user.model')
const PostSchema = require('../models/post.model')
const roleSchema = require('../models/role.model')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')

//Update User

exports.updateUser = async(req,res)=>{
   if(req.body.userId === req.params.id){
    if(req.body.password){
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hashSync(req.body.password,salt)
    }
    try {
    const updateUser = await UserSchema.findByIdAndUpdate(req.params.id,{$set:req.body})
   
     return res.status(200).send(updateUser)

     
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}else{
    return res.status(401).send({msg:"you can update only your account!"})
}

}


//Delete User

exports.deleteUser = async(req,res)=>{

    const adminRole = await roleSchema.findOne({roleName:'admin'});


   if(req.body.userId === req.params.id ||adminRole){

try {
    const user = await UserSchema.findById(req.params.id)

    try {
        await PostSchema.deleteMany({username:user.username})
        await UserSchema.findByIdAndDelete(req.params.id)
        return res.status(200).send({msg:"user has been deleted..."})
       } catch (error) {
           return res.status(500).send({error:error})
       }

} catch (error) {
    return res.status(404).send({msg:"User not found"})
}

}else{
    return res.status(401).send({msg:"you can delete only your account!"})
}

}

// Get one user
exports.getOneUser = async(req,res)=>{

    try {
       const user = await UserSchema.findById(req.params.id)
       const {password, ...others} = user._doc; 
       return res.status(200).send({others})
    } catch (error) {
        return res.status(500).send({error:error})
    }
}


exports.getAllUsers = async(req,res)=>{

    try {
       const users = await UserSchema.find()
       if(users.length == 0){
        return res.status(400).send({msg:"User collection is empty"})
       }
       return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send({error:error})
    }
}

