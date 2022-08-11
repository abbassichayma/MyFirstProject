const loginRouter = require('express').Router();
const {register,login,} = require('../controllers/login.controller');
const { isAuth } = require('../middleweares/isAuth');
const {RegistreValidation,LoginValidation,validation} = require("../middleweares/validation")

loginRouter.post('/register',RegistreValidation,validation,register);
loginRouter.get('/current',isAuth,async(req,res)=>res.send({user:req.user}));
loginRouter.post('/login',LoginValidation,validation,login);



module.exports = loginRouter