const postRouter = require('express').Router();
const {createPost,updatePost,deletePost,getOnePost,getAllPost,likePost,heartPost} = require('../controllers/posts.controllers')
const  {isAuth} = require('../middleweares/isAuth')
postRouter.post('/',createPost);
postRouter.put('/:id',updatePost);
postRouter.delete('/:id',deletePost);
postRouter.get('/:id',getOnePost);
postRouter.get('/',getAllPost);
postRouter.put('/:id/likePost',likePost);
postRouter.put('/:id/heartPost',heartPost);

module.exports = postRouter