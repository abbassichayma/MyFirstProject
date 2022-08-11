import {Button, Navbar} from 'react-bootstrap'
import { React } from 'react';
import './users.css'
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import {DeleteUser} from '../../redux/Action'
import { Link } from 'react-router-dom';

function Users() {
  
  const Users =useSelector(state=>state.users)
  const dispatch = useDispatch()

  
  return (
<>
    <Navbar>
    <Button className='User'>
     <Link  style={{color:"white"}} to="/categories" >Categories</Link>
     </Button>
    </Navbar>
   
    <Table  striped bordered hover size="sm" className='users'>
      <thead>
        <tr style={{ fontFamily: 'Lora'}}>
          <th>Nom et prénom </th>
          <th  >Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {Users.map(el=>
        <tr style={{ fontFamily: 'Lora'}}>
          <td>{el.username}</td>
          <td > {el.email} </td>
          <td> <Button className='supUser' onClick={()=> dispatch(DeleteUser(el._id))}>supprimer</Button></td>
        </tr>
        )}  
      </tbody>
    </Table>
    </>
  );
}

export default Users;