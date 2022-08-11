const express = require('express');

const roleRouter = express.Router()

const {getOnerole,deleteOnerole} = require('../controllers/role.controller')


roleRouter.get('/:id',getOnerole)
roleRouter.delete('/delete/:id',deleteOnerole)






module.exports = roleRouter;



// roleRouter.get('/',getroles)
// roleRouter.post('/addrole',addrole)
// roleRouter.put('/update/:id',updateOnerole)