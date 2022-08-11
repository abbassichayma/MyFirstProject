const CategorySchema =require('../models/category.model')
const  roleSchema = require('../models/role.model')


exports.createCategory = async(req,res)=>{
 const {name} = req.body
 const adminRole = await roleSchema.findOne({roleName:'admin'});
 console.log("admin",adminRole)
    try {
      let newCategorie ;  
      const isCat = await CategorySchema.findOne({name:name})
      const newCat = new CategorySchema(req.body)

      if(isCat){
         newCategorie =isCat 
      }
      else if(adminRole){
         newCategorie=newCat
      }

       const savedCat = await newCategorie.save()
     
       return res.status(200).send(savedCat)
       } 
       catch (error) {
        return  res.status(500).send({error:error})
       }
 
       } 

       exports.getAllCategory = async(req,res)=>{

          try {
             const cats = await CategorySchema.find()
             if(cats.length===0){
                return res.status(400).send({msg:"there is no category!!!!"})
             }
             return res.status(200).send(cats)
             } 
             catch (error) {
              return  res.status(500).send({error:error})
             }
       
             } 

             exports.deleteOneCategory = async(req,res)=>{
               const adminRole = await roleSchema.findOne({roleName:'admin'});
               const {id}=req.params
               try {
                  if(adminRole){
                 await CategorySchema.findByIdAndDelete(id)
                 return res.status(200).send({msg:"category deleted successfully"})
               }
                 
                  } 
                  catch (error) {
                   return  res.status(500).send({error:error})
                  }
            
                  } 
       
 