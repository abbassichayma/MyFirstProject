const init = {
   
    user:{},
    // isFetching:false,
    error:false,
    users:[],
    role:{},
    likes:[],
    hearts:[],
    categories:[]
   
}


const Reducer = (state=init,action)=>{
    
    switch (action.type) {
         
        case 'LOGIN-START':
           return {
            ...state,
               user:{},
               isFetching:true,
               error:false,
           } 

           case 'LOGIN-SUCCESS':
            return {
             ...state,
                user:action.payload,
                // isFetching:false,
                error:false,
                      
            } 

            case 'LOGIN-FAILURE':
                return {
                 ...state,
                    user:{},
                    // isFetching:false,
                    error:true,
                } 

            case 'CURRENT':
           return{
            ...state,
            user:action.payload,
            // users:[...state.users,action.payload]   
           
                 }


           case 'ROLE':
            return{
                ...state,
                role:action.payload
            }  


     


         case 'UPDATE-START':
           return {
            ...state,
            //    isFetching:true,
           } ;

           case 'UPDATE-SUCCESS':
            console.log("success",action.payload)
            return {
             ...state,
                user:action.payload,
                // isFetching:false,
                error:false,
                        
            } 

            case 'UPDATE-FAILURE':
                return {
                 ...state,
                    user:state.user,
                    // isFetching:false,
                    error:true,
                } 

                case 'ALLUSERS':
                    
                    return{
                        ...state,
                        users:action.payload
                    }  
                    case 'DELETE-USER':
                        console.log(action.payload)
                        return {
                            ...state,
                            users: state.users.filter(el=>el._id!=action.payload)
                        }
                      
                        case 'LIKES':
                        return{
                                ...state,
                                likes:action.payload
                            }

                        case 'HEARTS':
                        return{
                         ...state,
                         hearts:action.payload
                              }


                    
                       case 'ALL-CAT':
                        return{
                          ...state,
                          categories:action.payload
                             }
                      case 'DELETE-CAT':
                   console.log("payload",action.payload)
                         return {
                             ...state,
                             categories: state.categories.filter(el=>el._id!=action.payload)
                                }     


                                case 'LOGOUT':
                                    return{
                                     ...state,
                                     user:{}
                                 }
           
        default: return state
           
    }
}

export default Reducer
