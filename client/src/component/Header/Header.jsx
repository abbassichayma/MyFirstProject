import "./Header.css"
import {Text} from '@chakra-ui/react' 
export default function header() {
  return (
    <div className="header">
    <div className= "headerTitles">
      {/* <span className = "headerTitleLg" style={{ color:"red"}}>Genre de domaine</span> */}
      {/* <Text className = "headerTitleLg"   as='i' style={{ color:"red"}}>Genre de domaine</Text> */}
    </div>
    <img
          className="hreaderImg"
          src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg"
          alt="Actualités"
        />


    </div>
  )
}
