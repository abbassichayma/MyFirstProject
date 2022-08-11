import './TopBar.css'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Avatar, Input, InputRightElement} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LogOut } from '../redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import CustumCard from '../CustumCard/CustumCard';


function TopBar({setSearsh} ) {
  const Role =useSelector(state=>state.role)
  // const cats =useSelector(state=>state.categories)
  const PF ="http://localhost:4000/images/";
   const User =useSelector(state=>state.user)
  const dispatch = useDispatch()
  const [cats,setCats]=useState([])
  const[tosearsh,setTosearsh] = useState(false)

  useEffect(() => {
  const getCats = async()=>{
    const res = await axios.get("/categories")
    setCats(res.data)
   
  };
  getCats()
  }, [])

   const token = localStorage.getItem('token')
  
 
   const handleLogout=()=>{
    dispatch(LogOut())
   }
  
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{textAlin:"center"}}>
          <Nav.Link href="/" style={{color:"teal" , fontFamily:"Lora"}}>Actualités</Nav.Link>
            {cats.map((c)=>(
            <Link to={`/?cat=${c.name}`}>
            <Nav.Link href="/" style={{color:"teal" , fontFamily:"Lora"}}>{c.name }</Nav.Link>
            </Link>
            ))}
            <br></br>  
            <Nav.Link href="/write" style={{color:"lightcoral" , fontFamily:"Lora"}}>Ecrire</Nav.Link>
          
           <Link to ="/"> <Nav.Link  href="/" onClick={()=>handleLogout()} style={{color:"teal" ,fontFamily:"Lora",}}>{token && "déconnexion"}</Nav.Link></Link>
           
   <Nav.Link href ="/admin" style={{color:"lightcoral" , fontFamily:"Lora"}}>{Role==="admin" && token && "Page admin"}</Nav.Link>

          </Nav>
        </Navbar.Collapse>


    <Input  placeholder="chercher" 
      style={{width:"110px" ,height:"40px",color:"black"}} 
      className="searsh"
      onChange={(e)=>setSearsh(e.target.value)}
      />
       
        <span className='span' onClick={()=>setTosearsh(true)}><i class=" fas fa-search"></i></span>

        {
          token ? <Link to="/settings"><Avatar className='avatar' src={PF + User.avatar} /> </Link>:
          (
            <>
            <Nav.Link href="/login" style={{color:"black" ,fontFamily:"Lora"}}>Connexion</Nav.Link>
            <Nav.Link href="registre" style={{color:"black" ,fontFamily:"Lora"}}>S'inscrire</Nav.Link>
            </>
          )
        }
       
      </Container>
    </Navbar>
  );
}

export default TopBar;
