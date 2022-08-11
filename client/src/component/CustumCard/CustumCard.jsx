import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './CustumCard.css'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Updateheart, Updatelikes } from '../redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import {NavDropdown} from 'react-bootstrap'
import {Button} from '@chakra-ui/react'

function CustumCard({posts,searsh}) {
  const PF ="http://localhost:4000/images/";
  const dispatch = useDispatch()
  const like =useSelector(state=>state.likes)
  const heart =useSelector(state=>state.hearts)
 
  console.log('heart',heart)
  
  return (
    <Row xs={1} md={4} className="g-4">
      {posts?.filter(post=>post.title.toLowerCase().includes(searsh)).map((post) => (
        
        <Col>
          <Card>
            {post.photo  && (post.photo.includes("jpg") ||post.photo.includes("png")||post.photo.includes("jpeg")) && (
          <Card.Img variant="top" src={PF + post.photo }   />
            )}
            {post.photo &&  post.photo.includes("mp4") &&(
        <video controls={true} width="100%" src={PF + post.photo}/>
       )} 
      
             {post.categories.map((cat)=>(
              <span>{cat.name}</span>
             ))}
            <Card.Body>
              <Link to={`/details/${post._id}`}><Card.Title className='CardTitle'>{post.title}</Card.Title></Link>
             <Card.Text className='cardDescription'>
                {post.description}
              </Card.Text>
              
              <span className='postDate'>{new Date(post.createdAt).toDateString()}</span>
              <div className='like'>
               <span className='heart'><i  class="far fa-thumbs-up" onClick={()=>{dispatch(Updatelikes(post._id))}}>{ post._id===like._id? like.likeCount:post.likeCount}</i></span>
               <span  className='share'><i class="far fa-thumbs-down"  onClick={()=>{dispatch(Updateheart(post._id))}}>{ post._id===heart._id? heart.heartCount:post.heartCount}</i></span>
               
               {/* <i class="far fa-thumbs-down"></i> */}
               {/* <NavDropdown title={<i class="fas fa-share"></i>} id="basic-nav-dropdown">
              <NavDropdown.Item href="https://fr-fr.facebook.com/">
              <Button colorScheme='facebook' leftIcon={<i class="fab fa-facebook"></i>}>
              Facebook
             </Button>

              </NavDropdown.Item>
              <NavDropdown.Item href="https://twitter.com/?lang=fr">
              <Button colorScheme='twitter' leftIcon={<i class="fab fa-twitter-square"></i>}>
             witter
             </Button>
              </NavDropdown.Item> */}
              {/* <NavDropdown.Item href="https://www.youtube.com/">
                
              <Button colorScheme='red' leftIcon={ <i class="fab fa-youtube"></i>}>
              youtube
             </Button>
              </NavDropdown.Item> */}
            {/* </NavDropdown>
                
                
                
                </span>                  */}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default CustumCard;