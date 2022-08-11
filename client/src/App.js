import logo from './logo.svg';
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import './App.css';
import {Routes,Route, useNavigate} from 'react-router-dom';
import TopBar from './component/TopBar/TopBar';
import Actualités from './component/Posts/Actualités/Actualités';
import CustumCardDetails from './component/CustumCard/CustumCardDetails';
import Write from './component/Posts/Write/Write';
import Settings from './component/Profiles/User/Settings/Settings';
import Login from './component/Profiles/User/Login/Login.jsx';
import Registre from './component/Profiles/User/Login/Registre';
import Admin from './component/Profiles/Admin/Admin'
import { allCats, currentUser, getUsers } from './component/redux/Action';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Users from './component/Profiles/Admin/users';
import Categories from './component/Profiles/Admin/Categories';

function App() {
  const [searsh,setSearsh]=React.useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const Role =useSelector(state=>state.role)

  useEffect(() => {
    dispatch(currentUser(token,navigate));
  }, []);
    
  useEffect(() => {
    dispatch(getUsers())
    
      }, []);

      useEffect(() => {
        dispatch(allCats())
        
          }, []);

         
  
  return (
    <ChakraProvider>
    <div className="App">
      <TopBar setSearsh={setSearsh}/>
      <Routes>
      <Route path='/' element={<Actualités searsh={searsh}/>}/>
      <Route path='/registre' element={token ?<Actualités/>:<Registre/>}/>
      <Route path='/login' element={token ?<Actualités/>:<Login/>}/>
      <Route path='/write' element={token ? <Write/> : <Registre/>}/>
      
      <Route path='/settings' element={token ? <Settings/> : <Registre/>}/>
      <Route path='/details/:detailsId' element={<CustumCardDetails/>}/>    
      <Route path='/admin' element={<Admin/> }/>    
      <Route path='/users' element={ Role==='admin' && <Users/> }/>    
      <Route path='/categories' element={ Role==='admin' &&<Categories/> }/>    
      {/* <Actualités/> */}
      {/* <CustumCardDetails/> */}
      {/* <Write/> */}
      {/* <Settings/> */}
      {/* <Login/> */}
      {/* <Registre/> */}

      </Routes>
    </div>
    </ChakraProvider>
  );
}

export default App;