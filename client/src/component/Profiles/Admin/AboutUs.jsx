import './AboutUs.css'
import {Avatar} from '@chakra-ui/react'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


function aboutUs() {
  return (
    <>
       <h1 className='titleAboutUs'>Contactez-nous</h1>
       {/* <h1 className='titleAboutUs'>About us <Avatar name='Dan Abrahmov' src=''/></h1>
       */}
       
      <Form.Text id="passwordHelpBlock" muted>
      Augier Ronald<br/>,Journaliste Web, Marketeur Digital, <br/>Entrepreneur centrafricain, Rédacteur en chef du site NOM DU SITE
        <br></br>  <a href="/"><span>{<i className="email far fa-envelope"> </i>}   ronald.augier.RA@gmail.com</span></a>
      </Form.Text>
      <ul class="social-list">
                <li > <a href="https://www.facebook.com/Ronaldaugier2.0">
                      <span>{<i className="facebook fab fa-facebook"  ></i>}</span></a>
                </li>
                <li > <a href="https://www.youtube.com/channel/UCaB-DU_jEOJSkAEcwFqd1BQ">
                      <span>{<i className="youtube fab fa-youtube"></i>}</span></a>
                </li>
        
       </ul>   
     
    </>
  );
}

export default aboutUs;