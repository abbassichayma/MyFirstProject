const userRouter = require('express').Router();
const {updateUser,deleteUser,getOneUser,getAllUsers} = require('../controllers/user.controller')

userRouter.put('/:id',updateUser);
userRouter.delete('/:id',deleteUser);
userRouter.get('/:id',getOneUser);
userRouter.get('/',getAllUsers);

module.exports = userRouter