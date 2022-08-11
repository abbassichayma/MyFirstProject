const UserSchema = require("../models/user.model")
const roleSchema = require('../models/role.model')
const bcrypt = require('bcrypt')


const initialisation = async()=>{
    try {
        [{roleName:'user'},{roleName:'admin'},{roleName:'gestionnaire'}].map(async(el)=>{
            const roleExist = await roleSchema.findOne(el)
            if(!roleExist){
               await roleSchema.insertMany([el])
               console.log(`${el.roleName} added successfully to role collection`)
            }
            }) 
            const userIsAdmin = await roleSchema.findOne({roleName:'admin'})  
            const isAdmin = await UserSchema.findOne({role:userIsAdmin._id})
            if(!isAdmin){
               const admin = await new UserSchema({
                  username:'AugierRonald',
                   email:'Augier.Ronald@gmail.com',
                   password:bcrypt.hashSync('789456123',10),
                   role:userIsAdmin._id
               })
               await admin.save()
               console.log('admin created')
            }
           } catch (error) {
            console.error(error)   
           }
       }
       
       module.exports = initialisation