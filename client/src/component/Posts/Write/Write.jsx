import { Card } from 'react-bootstrap'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {InputGroup, InputLeftAddon, Select} from '@chakra-ui/react'
import './Write.css'
function Write() {
  
  const User =useSelector(state=>state.user)
  const [title,setTiltle]=useState("")
  const [description,setDescription]=useState("")
  const [file,setFile]=useState(null)
  const [categories,setCategories]=useState("")
  const [error,setError]=useState(false)
  const [plus,setPlus]=useState("")
const Role =useSelector(state=>state.role)
const handleSubmit = async(e)=>{
  e.preventDefault()
  const newPost ={
    username:User.username,
    title,
    categories,
    description,
  };
  if(file){
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append("name",filename);
    data.append("file",file);
    newPost.photo = filename;
    try {
      await axios.post("/upload",data);
    } catch (error) {}
  }
  if(categories){
    try {
      if(Role==="admin"){
        try {
          await axios.post("/categories",{name:categories})
        } catch (error) {}
      }
    } catch (error) {}
    
  }
  try {
    const res =  await axios.post("/posts",newPost);
    setPlus(res.data.photo)
    console.log("write",plus)
   
      window.location.replace("/details/" + res.data._id);
   } catch (error) {setError(true)};
}




  return (
    <div className='write'>
      {
      file && (plus.includes("jpg") ||plus.includes("png")||plus.includes("jpeg"))&&(
       <Card.Img
           className='writeImg hreaderImg'
           src={URL.createObjectURL(file)}
           alt=""
           /> 
           ) } 

{
      file && (plus.includes("mp4"))&&(
        <video controls={true} width="100%" src= {URL.createObjectURL(file)}/>
      
           ) } 
     
      <form className="writeForm" onSubmit={(e)=>handleSubmit(e)}>
  <div className='writeFormGroup'>
    <label htmlFor='fileInput'>
       <i className="writeIcon fas fa-plus"></i>
       </label>

   <input type="file" 
    id="fileInput" 
    style={{display:"none"}}
    onChange={(e)=>setFile(e.target.files[0])}
    />

   <input 
   type="text"  
   placeholder='Titre' 
   className='writeInput' 
   utoFocus={true}
   onChange={(e)=>setTiltle(e.target.value)}
   />
    {error &&<div style={{color:"red",margin:"10px"}}>le titre de votre article doit être unique !</div>}
   <input 
   type="text"  
   placeholder='Category ( Politique ,Sport ,Economie...)' 
   className='writeInput' 
   utoFocus={true}
   style={{fontSize:"20px"}}
   onChange={(e)=>setCategories(e.target.value)}
   />

{/* <div className='writeInput' style={{border:"none"}}>
<InputGroup className='writeInput' >
          <InputLeftAddon children='Category' style={{display:"none"}} />
          <Select  onChange={(e)=>setCategories(e.target.value)}>
        <option selected disabled style={{display:"none"}} >Category</option>
        <option value='Actualités'>Actualités</option>
        <option value='Politique'>Politique</option>
        <option value='Economie'>Economie</option>
        <option value='Culture'>Culture</option>
        <option value='Sport'>Sport</option>
        <option value='Art'>Art</option>
       </Select> 
          </InputGroup>
          </div> */}

  </div>
  <div className="writeFormGroup">
    <textarea 
    onChange={(e)=>setDescription(e.target.value)}
    placeholder='Ecrire votre article...' 
    type='text' 
    className='writeText writeInput'> 
   
    </textarea>
    <button className='writeSubmit' type='submit'>Publier</button>
  </div>
      </form>
    </div>
  )
}

export default Write