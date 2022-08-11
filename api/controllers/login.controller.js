const UserSchema = require('../models/user.model')
const roleSchema = require('../models/role.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


//Regitre
exports.register = async(req,res)=>{
   
    try {
    
     const userRole = await roleSchema.findOne({roleName:'user'})

     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hashSync(req.body.password,salt)

     const newUser = new UserSchema({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,
        role:userRole._id,
       
     })
     const token = jwt.sign({id:newUser._id},process.env.passwordToken)
    const user = await newUser.save()
     return res.status(200).send({msg:'user added to user collection',token,user})
   
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}


//Login

exports.login = async(req,res)=>{
    const {username,password} = req.body;
    try {
     const userExist = await UserSchema.findOne({username:username});
     if(!userExist){
        return res.status(400).send({msg:'Wrong credentials!!'})
     }
     const passwordTrue = bcrypt.compareSync(password,userExist.password)
     if(!passwordTrue){
        return res.status(400).send({msg:'Wrong credentials!!'})
     }
    

     const token = await jwt.sign({id:userExist._id},process.env.passwordToken)
     console.log('token',token)
     return res.status(200).send({msg:'user logged successfully!!',token,userExist})
    } catch (error) {
        return res.status(500).send({error:error})
    }
}