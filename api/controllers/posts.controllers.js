const UserSchema = require('../models/user.model')
const roleSchema = require ('../models/role.model')
const PostSchema = require('../models/post.model')



//CREATE POST

exports.createPost = async(req,res)=>{
const  newPost = new PostSchema(req.body);

    try {
        const savePost = await newPost.save();
        console.log('Creation',savePost)
        return  res.status(200).send(savePost)


    } catch (error) {
       return  res.status(500).send({msg:error})
    }
}

//UPDATE POST
exports.updatePost = async(req,res)=>{
   const {username} = req.body;
        try {
           const  post = await PostSchema.findById(req.params.id)
          
           const adminRole = await roleSchema.findOne({roleName:'admin'});
         
           if(post.username === req.body.username ||adminRole){

        try {
            const updatePost = await PostSchema.findByIdAndUpdate(req.params.id,{$set:req.body})
           
           const updateP =await updatePost.save()
         
            return res.status(200).send(updateP)
           } catch (error) {
            return  res.status(500).send({error:error})
           }
      
           }
           else{
            return res.status(401).send({msg:"you can update only your post"})
           }

          
       
        } catch (error) {
           return  res.status(500).send({error:error})
        }
    }


    //DELETE POST

exports.deletePost = async(req,res)=>{
    
   try {
      const  post = await PostSchema.findById(req.params.id)
      const adminRole = await roleSchema.findOne({roleName:'admin'});
      if(post.username === req.body.username ||adminRole){

   try {
       await post.delete();
       return res.status(200).send("post has been deleted...")
      } catch (error) {
       return  res.status(500).send({error:error})
      }

      } else{
       return res.status(401).send("you can delete only your post")
      }
  
   } catch (error) {
      return  res.status(500).send({error:error})
   }
}

 //GET ONE POST

 exports.getOnePost = async(req,res)=>{
    
   try {
      const  post = await PostSchema.findById(req.params.id)
      if(!post){
         return res.status(400).send("post not found")
      } 

   
       return res.status(200).send(post)
         
      } catch (error) {
       return  res.status(500).send(error)
      }

      } 


      //GET ALL POSTS


exports.getAllPost = async(req,res)=>{

   const username = req.query.user;
   const catName = req.query.cat
    
   try {
      let posts;
      if(username){
         posts = await PostSchema.find({username})
      } else if (catName){
         posts = await PostSchema.find({categories:{$in:[catName]}})
      } else {
         posts = await PostSchema.find();
      }
       return res.status(200).send(posts)
      } 
      catch (error) 
      {
       return  res.status(500).send({error:error})
      }

      } 

      // exports.jjj = async(req,res)=>{
      //    const  {id} = req.params;
      //    if(!req.user) return({msg:"no access"});
      //     console.log('tokennn',req.user)

      //       const post = await PostSchema.findById(id)

      //       const index = post.likes.findIndex((id)=>id===String(req.user._id));
      //       if(index==-1){
      //          //like post
      //        post.likes.push(req.user._id)
            
      //       } else {
      //          //dislike the post
      //        post.likes=post.likes.filter((id)=>id !== String(req.user._id))
      //       }

      //       const updatePost = await PostSchema.findByIdAndUpdate(id,post,{new:true})
      //       return res.status(200).send(updatePost);
      //    }


       exports.likePost = async(req,res)=>{
         const  {id} = req.params;
         const post = await PostSchema.findById(id)

         const updatePost = await PostSchema.findByIdAndUpdate(id,{likeCount:post.likeCount +1})
         return res.status(200).send(updatePost);
        
       }

       exports.heartPost = async(req,res)=>{
         const  {id} = req.params;
         const post = await PostSchema.findById(id)

         const updatePost = await PostSchema.findByIdAndUpdate(id,{heartCount:post.heartCount +1})
         return res.status(200).send(updatePost);
        
       }