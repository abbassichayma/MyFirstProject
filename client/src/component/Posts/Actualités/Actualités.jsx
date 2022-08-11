import React, { useEffect, useState } from 'react'
import CustumCard from '../../CustumCard/CustumCard'
import Header from '../../Header/Header'
import AboutUs from '../../Profiles/Admin/AboutUs'
import axios from "axios"
import { useLocation } from 'react-router-dom'
import Introduction from '../../Header/Introduction'
function Actualités({searsh}) {

const [posts,setPosts] = useState([]);

const {search} = useLocation()

const fetchPosts = async()=>{
  const res = await axios.get("/posts"+search)
  setPosts(res.data)
  console.log("plus",res.data)
 
}
useEffect(() => {
  fetchPosts()
}, [search])


  return (
    <div>
        <Header/><br></br>
        <Introduction/><br></br>
        <CustumCard posts={posts} searsh={searsh} /><br></br><br></br>
        <AboutUs/>
    </div>
  )
}

export default Actualités