const categoryRouter = require('express').Router();
const {createCategory,getAllCategory,deleteOneCategory} = require('../controllers/categories.controller')

categoryRouter.post('/',createCategory);
categoryRouter.get('/',getAllCategory);
categoryRouter.delete('/:id',deleteOneCategory);


module.exports = categoryRouter