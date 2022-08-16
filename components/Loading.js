/* eslint-disable react/jsx-no-duplicate-props */
import styled from "styled-components";

import {Circle} from "better-react-spinkit";

function Loading() {
  return (
    
    <center style = {{display:"flex",flexDirection:"column",justifyContent: "center",height : "90vh"}}>
        <div>
            <Logo src="https://img.icons8.com/clouds/344/whatsapp.png"
               style = {{marginBottom: "25px"}}
               height ={350}
               

            />
        </div>
        <Circle color="#128C7E" size={60}/>
    </center>
  )
}

export default Loading


const Logo = styled.img``;