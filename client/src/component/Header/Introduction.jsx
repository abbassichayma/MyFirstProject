import React from 'react'
import './Introduction.css'
import Form from 'react-bootstrap/Form';
function Introduction() {
  return (
    <div>
         <h3 className='intro'>vous êtes les bienvenus</h3><br></br>
      
       
      <Form.Text id="passwordHelpBlock" muted>
      Bienvenue sur la plateforme d’information générale,<br></br> ici vous trouverez des 
      informations en temps réelle, des informations vérifiées, provenant de bonne source.<br></br> 
       Ce site contribue 
      à l’émancipation de la bonne nouvelle et combat les Fake News à travers le monde.
      </Form.Text>
    </div>
  )
}

export default Introduction