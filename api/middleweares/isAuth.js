const jwt = require('jsonwebtoken');

const UserSchema = require('../models/user.model')


exports.isAuth = async(req,res,next) =>{
    const token = req.header('Authorization');
    // console.log(token) 
    try {
        if(!token){
            return res.status(404).send({msg:'you don\'t have access'});
        }

        const decode = jwt.verify(token,process.env.passwordToken);
        if(!decode){
            return res.status(404).send({msg:'you don\'t have access'});

        }
       
        const user = await UserSchema.findById(decode.id);
        if(!user){
            return res.status(404).send({msg:'you don\'t have access'}); 
        }
        req.user = user;
        // console.log("ttttt",req.user)
        next()
        
    } catch (error) {
        return res.status(500).send({error:error})
    }
}