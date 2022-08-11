const { body, validationResult } = require('express-validator');


exports.RegistreValidation = [
    body('username','username required').isString().notEmpty(),
    body('email','email required and e-mail format').notEmpty().isEmail().normalizeEmail(),
    body('password','password required').isString().notEmpty().isLength({min:5})
    
]

exports.LoginValidation = [
  body('username','username required').isString().notEmpty(),
  body('password','password required').isString().notEmpty().isLength({min:5})
]


exports.validation = async(req,res,next)=>{
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
   } catch (error) {
    return res.status(500).send({error:error})
   }
}