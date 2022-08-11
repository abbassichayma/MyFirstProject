const roleSchema = require('../models/role.model')




exports.getOnerole = async (req,res) =>{
    const {id} = req.params
     try {
         const role = await roleSchema.findById(id);
         return res.status(200).send({role})
     } catch (error) {
         return res.status(500).send({error:error})
     }
 }
 
 exports.deleteOnerole = async (req,res) =>{
     const {id} = req.params
      try {
          await roleSchema.findByIdAndDelete(id);
          return res.status(200).send({msg:'role deleted successfully'})
      } catch (error) {
          return res.status(500).send({error:error})
      }
  }
 