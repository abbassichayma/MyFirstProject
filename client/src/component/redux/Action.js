import axios from 'axios'

//ACTION LOGIN

export const LoginStart = (userCredentials) => async(dispatch)=>{
    console.log("user",userCredentials)
    try {
     const res = await axios.post("/login",userCredentials);
     dispatch({
         type:'LOGIN-START',
     })
    dispatch(LoginSuccess(res.data))
    dispatch(currentUser(res.data.userExist))
    //  console.log("test11",res.data.userExist)
    } catch(error) {

        dispatch(LoginFailure())
    
    } 
 }


 export const LoginSuccess = (user) => async(dispatch)=>{
    
    try {
     dispatch({
         type:'LOGIN-SUCCESS',
         payload:user,
     })
     localStorage.setItem('token',user.token)
     dispatch(currentUser(user.token))
    } catch(error) {
     console.log(error)
    } 
 }


 export const LoginFailure = () => async(dispatch)=>{
    
    try { 
     dispatch({
         type:'LOGIN-FAILURE',
        
     })
    } catch(error) {
     console.log(error)
    } 
 }


 //ACTION USERS

 export const currentUser = (token) =>async(dispatch) =>{
    const config = {
        headers:{
            Authorization:token
        }
    }
    try {
        const {data} =  await axios.get("/current",config);
      
        dispatch({
            type:'CURRENT',
            payload:data.user
        })
        dispatch(roleUser(data.user.role))
       
    } catch (error) {
        console.log(error)
    }
}

export const roleUser = (roleId) =>async(dispatch) =>{
  
    try {
        const {data} =  await axios.get(`http://localhost:4000/api/role/${roleId}`);
       
        dispatch({
            type:'ROLE',
            payload:data.role.roleName
        })
    
    } catch (error) {
        console.log(error)
    }
}


//ACTION LOGOUT
export const LogOut = () => async(dispatch)=>{
      
    dispatch({
         type:'LOGOUT',    
            })
     localStorage.removeItem('token')
    } 



//ACTION UPDATE PROFILE

    export const UpdateStart = () => async(dispatch)=>{
        try {
       
         dispatch({
             type:'UPDATE-START',
         })
        } catch(error) {
    
            dispatch(UpdateFailure())
        
        } 
     }
    
    
     export const UpdateSuccess = (user) => async(dispatch)=>{
        console.log("user",user)
        try {
         dispatch({
             type:'UPDATE-SUCCESS',
             payload:user,
         })
       
       
        } catch(error) {
         console.log(error)
        } 
     }
    
    
     export const UpdateFailure = () => async(dispatch)=>{
        
        try { 
         dispatch({
             type:'UPDATE-FAILURE',   
         })
        } catch(error) {
         console.log(error)
        } 
     }
    

// GET ALL USERS



 export const getUsers = () =>async(dispatch) =>{
    
      try {
          const {data} =  await axios.get(`http://localhost:4000/api/users`);
         
          dispatch({
              type:'ALLUSERS',
              payload:data
          })
      } catch (error) {
          console.log(error)
      }
  }


export const DeleteUser = (id) =>async(dispatch) =>{
    console.log('id',id)
    try {
        const {data} =  await axios.delete("http://localhost:4000/api/users/"+id);
     
        dispatch({
            type:'DELETE-USER',
            payload:id
        })
        
    } catch (error) {
        console.log(error)
    }
}


export const Updatelikes = (id) =>async(dispatch) =>{
   
    try {
        const {data} =  await axios.put("http://localhost:4000/api/posts/"+id+"/likePost");
     
        dispatch({
            type:'LIKES',
            payload:data
        })
        
    } catch (error) {
        console.log(error)}
    }

    export const Updateheart = (id) =>async(dispatch) =>{
   console.log("samer",id)
     try {
     const {data} =  await axios.put("http://localhost:4000/api/posts/"+id+"/heartPost");
             
            dispatch({
                type:'HEARTS',
               payload:data
                })
                
            } catch (error) {
               console.log(error)}
        }



    
    
    export const allCats = () =>async(dispatch) =>{
   
            try {
                const {data} =  await axios.get("http://localhost:4000/api/categories/");
               
                dispatch({
                    type:'ALL-CAT',
                    payload:data
                })
                
            } catch (error) {
                console.log(error)
            }
        }

        export const DeleteCat = (id) =>async(dispatch) =>{
            console.log('iddddd',id)
            try {
             await axios.delete("http://localhost:4000/api/categories/"+id);
             
                dispatch({
                    type:'DELETE-CAT',
                    payload:id
                })
                
            } catch (error) {
                console.log(error)
            }
        }