import { Avatar } from "@mui/material";
import styled from "styled-components";
import getRecipientEmail from "../utils/getRecipientEmail";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth,db } from "../firebase";
import { collection,query, where , addDoc } from "firebase/firestore"; 
import { useCollection } from "react-firebase-hooks/firestore";
import {useRouter} from "next/router";
import Router from "next/router";
function Chat({id,users}) {
  
  
  const  router = useRouter();
  const enterChat =  () => {
    router.push(`/chat/${id}`);
  }
  
  /**Essential portion this is Needed to explicitely import the recipientEmail*/
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(users,user)));
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const recipientEmail = getRecipientEmail(users,user);

  
  return (

    <Container onClick={enterChat}>
        {recipient ? (
          <UserAvater src={recipient?.photoURL} />
        ):(
          <UserAvater>{recipientEmail[0]}</UserAvater>
        )}
        <p>{recipientEmail}</p>
    </Container>
      
   

          
  )
}

export default Chat



const UserAvater = styled(Avatar)`
    margin:5px;
    margin-right:15px;
`;
const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-word;
    

    :hover{
        //
        background-image: linear-gradient(to right bottom, #4fc0e6, #32c5df, #20cad3, #2dcdc2, #48cfaf);
        border-radius: 15px;
        font-size: larger;
    }

`;