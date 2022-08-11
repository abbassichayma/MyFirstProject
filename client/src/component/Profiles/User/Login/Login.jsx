import { Button, Input } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { LoginStart } from '../../../redux/Action'
import './Login.css'
function Login() {
  let navigate=useNavigate();
const dispatch = useDispatch()
// const User =useSelector(state=>state.user)
const IsFetching =useSelector(state=>state.isFetching)
const userRef = useRef();
const passwordRef = useRef();

  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(LoginStart({
      username:userRef.current.value,
      password:passwordRef.current.value,
    }))
    navigate("/") 
  }
  
  console.log("isFetching",IsFetching)
  return (
    <div className='login'>
        <span className="loginTitle">Connexion</span>
        <form className="loginForm"  onSubmit={(e)=>handleSubmit(e)}>
            <label>Nom et Prénom</label>

            <Input  
            type="text" 
            className='loginInput' 
            placeholder='nom et prénom'
            ref={userRef}
            />
           
            <label>mot de passe</label>
            
            <Input  
            type="password"  
            className='loginInput' 
            placeholder='mot de passe'
            ref={passwordRef}
            />
           
            <Button className='loginButton' type='submit' >connexion</Button>
          
        </form>
        
        <Button className='loginRegistreButton'>
          <Link  style={{color:"white"}} to="/registre" >S'inscrire</Link>
          </Button>
        
    </div>
  )
}

export default Login