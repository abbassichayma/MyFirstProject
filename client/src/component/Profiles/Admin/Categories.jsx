import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Categories.css" 
import Table from 'react-bootstrap/Table';
import { Button, Navbar } from 'react-bootstrap';
import { DeleteCat } from '../../redux/Action';
import { Link, useParams } from 'react-router-dom';
function Categories() {
    const dispatch = useDispatch()
    const Cats = useSelector(state=>state.categories)
    let {id} = useParams();
    const handleDelete =()=>{
      dispatch(DeleteCat(id))
    }
    
  return (
    <>
    <Navbar>
    <Button className='cats'>
      <Link style={{color:"white"}} to="/users" >Utilisateurs</Link>
     </Button>
    </Navbar>
   
    <Table  striped bordered hover size="sm">
    <thead>
      <tr style={{ fontFamily: 'Lora'}}>
        <th>Category</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {Cats?.map((el)=>
      <tr style={{ fontFamily: 'Lora'}}>
        <td>{el.name}</td>
        <td><Button className="supCats" style={{border:"lightcoral"}} onClick={()=> dispatch(DeleteCat(el._id))}>supprimer</Button></td>
      </tr>
      )}
    </tbody>
  </Table>
  </>
  )
  
}
   



export default Categories