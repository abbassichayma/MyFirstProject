import { Button, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Registre.css'
function Registre() {
 
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(false)
  const handleSubmit= async(e)=>{
    e.preventDefault();
    setError(false)
    try {
      const res = await axios.post("/register",{
        username,
        email,
        password
      });
    
      res.data && window.location.replace("/login")
    } catch (error) {
      setError(true)
    }
  }
  return (
    <div className='register'>
        <span className="registerTitle">S'inscrire</span>
        <form className="registerForm"  onSubmit={(e)=>handleSubmit(e)}>

        <label>Non et Prénom</label>
            <Input  type="text"  
            className='registerInput' 
            placeholder='nom et prénom'
            onChange={(e)=>setUsername(e.target.value)}
            />
            
            <label>Email</label>
            <Input  type="text" 
            className='registerInput' 
            placeholder='email'
            onChange={(e)=>setEmail(e.target.value)}
            />
           
            <label>mot de passe</label>
            <Input  type="password"  
            className='registerInput' 
            placeholder='mot de passe'
            onChange={(e)=>setPassword(e.target.value)}
            />
            
            <Button className='registerButton' type="submit" >S'inscrire</Button>
            {error &&<div style={{color:"red",margin:"10px"}}>quelque chose est mal passé !</div>}
        </form>
        <Button className='registerLoginButton'>
        <Link style={{color:"white"}} to="/login" >connexion</Link>
        </Button>
        
    </div>
  )
}

export default Registre