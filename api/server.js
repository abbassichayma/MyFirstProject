const express = require('express')
const app= express();
const connect = require('./config/connect')
const init = require("./config/setUp")
const loginRouter = require('./routes/login.routes')
const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/posts.routes')
const categoryRouter = require ('./routes/categories.routes')
const roleRouter = require('./routes/role.routes');
const cors = require('cors')
const dotenv = require('dotenv')
const multer = require('multer')
const path = require("path");


dotenv.config();


app.use(express.json())
app.use(cors());
app.use("/images",express.static(path.join(__dirname,"/images")))


const PORT = 4000 || process.env.PORT
connect()
init()


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
     cb(null,"images");
    },
    filename :(req,file,cb) => {
     cb(null,req.body.name)
    }, 
 });
  const upload = multer({storage:storage});
  app.post("/api/upload",upload.single("file",(req,res)=>{
     return res.status(200).send("file has been uploaded")
  }));


  
  app.use("/api",loginRouter)
  app.use("/api/users",userRouter)
  app.use("/api/posts",postRouter)
  app.use("/api/categories",categoryRouter)
  app.use('/api/role',roleRouter);

 


app.listen(PORT,(err)=>{
    if(err) throw console.log(err)
    console.log('listen to port '+PORT)
})