import { Button, Img, Input } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { UpdateFailure, UpdateStart, UpdateSuccess } from '../../../redux/Action'
import './Settings.css'
function Settings() {
  let navigate = useNavigate()
  const dispatch=useDispatch()
  const [file,setFile]=useState(null)
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [success,setSuccess]=useState(false)
  

  const User =useSelector(state=>state.user)
  const PF ="http://localhost:4000/images/";
  const handleSubmit = async(e)=>{
    e.preventDefault()
    dispatch(UpdateStart())
    const updatedUser ={
      userId:User._id,
      username,
      email,
      password,
    };
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name",filename);
      data.append("file",file);
      updatedUser.avatar = filename;
      try {
        await axios.post("/upload",data);
      } catch (error) {}
    }
    try {
    const res = await axios.put("/users/"+User._id,updatedUser);
    setSuccess(true)
    dispatch(UpdateSuccess(res.data))
     } catch (error) {
      dispatch(UpdateFailure())
     };
  };
 
   
  {success && alert("mis à jour avec succès...")}
console.log("User",User)
  return (
    <div className='settings'>
<div className="settingsWrapper">
    <div className="settingsTitle">
        <Button className='settingsUpdateTitle'>Modifier </Button>
        <Button className='settingsDeleteTitle'>Supprimer</Button>
    </div>
    <form className="settingsForm" onSubmit={(e)=>handleSubmit(e)}>
    <label>Photo de profile</label>
    <div className="settingsPP">
        <Img
        src={ file ? URL.createObjectURL(file) : PF+User.avatar}
        alt=""
        />
        <label htmlFor='fileInput'>
        <i className="settingsPPIcon fas fa-user-circle"></i>
        </label>
        <Input 
        type="file" 
        id="fileInput" 
        style={{display:"none"}}
        onChange={(e)=>setFile(e.target.files[0])}
        />
    </div>
    <label>Nom et prénom</label>
    <Input type="text" placeholder={User.username}   onChange={(e)=>setUsername(e.target.value)}/>
    <label>email</label>
    <Input type="email" placeholder={User.email} onChange={(e)=>setEmail(e.target.value)}/>
    <label>password</label>
    <Input type="password" placeholder='mot de passe'  onChange={(e)=>setPassword(e.target.value)}/>
    <Button className='settingsSubmit' type='submit'>modifier</Button> 
    {success &&<div style={{color:"green",margin:"10px"}}>mis à jour avec succès...</div> }
    
    </form>
    </div>
    </div>
  )
}

export default Settings