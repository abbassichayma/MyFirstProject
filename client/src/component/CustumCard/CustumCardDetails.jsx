import './CustumCardDetails.css'
import React, { useEffect,useState } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, Input } from '@chakra-ui/react';
import {ButtonGroup, Form} from 'react-bootstrap'

function CustumCardDetails() {
  const PF ="http://localhost:4000/images/";
const location = useLocation()
const path = location.pathname.split("/")[2];
const [post,setPost]=useState({})
const User =useSelector(state=>state.user)
const Role =useSelector(state=>state.role)
const [title,setTitle]=useState("")
const [desc,setDesc]=useState("") 
const [plus,setPlus]=useState("")

const [updateMode,setUpdateMode]=useState(false)

useEffect(() => {
  const getPost = async()=>{
    const res = await axios.get("/posts/"+path); 
    setPost(res.data);
    setTitle(res.data.title);
    setDesc(res.data.description);
    setPlus(res.data.photo)
   
  };
  getPost()
}, [path])

const handleDelete = async()=>{
 try {
  await axios.delete(`/posts/${post._id}`,{
    data:{username:User.username},
  });
  window.location.replace("/");
 } catch (error) {}
}

const handleUpdate = async()=>{

  try {
    await axios.put(`/posts/${post._id}`,{
      username:User.username,
      title:title,
      description:desc,
    });
    // window.location.reload();
    setUpdateMode(false)
   } catch (error) {}

}
 
  return (
    <Row xs={1} md={1} className="g-4">
      {post && Array.from({ length: 1 }).map((_, idx) => (
        <Col>
          <Card> 
        
          {post.photo &&( plus.includes("jpg") ||plus.includes("png")||plus.includes("jpeg")) && (
          <Card.Img variant="top" style={{height:"290px",borderRadius:"10px" ,margin:"0 20% 0 10% ",width: "70vw" }} src={PF + post.photo} 
           />
            )}

             {post.photo && plus.includes("mp4") && (<video controls  src= {PF + post.photo} />
            )}

             {updateMode ? (
             <input type="text" value={title} className='singlePostTitleInput' autoFocus onChange={(e)=>setTitle(e.target.value)} />
             ) : (

              <Card.Title  className='singlePostTitle'>{title}
             {(post.username===User?.username || Role==="admin") && (
             
             <div className='singlePostEdit'>
             <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
             <i className="singlePostIcon  far fa-trash-alt" onClick={()=>handleDelete()}></i>
            </div>
             )}
             
              
            </Card.Title>
            )}
              <div className='SinglePostInfo'>
                 <span className='singlePostAuthor'>Ecrivain:<> <Link to={`/?user=${post.username}`}>{post.username}</Link></></span>
                 <span className='singlePostDate'> <>{new Date(post.createdAt).toDateString()}</></span>
              </div>
              {updateMode ? (<Form.Control l as="textarea"   value={desc} className='singlePostDescInput' onChange={(e)=>setDesc(e.target.value)} />): (
                <Form.Text  className='singlePostDesc'>
                  {desc}
                </Form.Text>
              )}
             
            
          </Card>
          {updateMode &&
           <button className='singlePostButton' onClick={()=>handleUpdate()}>modifier</button>
          }
         
        </Col>
      ))}
    </Row>
  );
}

export default CustumCardDetails;