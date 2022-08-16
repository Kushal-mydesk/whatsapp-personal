import styled from "styled-components"
import {useAuthState} from "react-firebase-hooks/auth";
import {auth,db} from "../firebase";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { Avatar, IconButton } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useRouter} from "next/router";
import {useCollection} from "react-firebase-hooks/firestore";
import Message from "./Message";
import {useState} from "react";
import firebase from "firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react"
function ChatScreen({chat,messages}) {

  const [user]= useAuthState(auth);
  const router = useRouter();
  const [input,setInput] = useState("")

  const [messagesSnapshot] = useCollection(
    db.collection('chats')
    .doc(router.query.id)
    .collection('messages')
    .orderBy("timestamp","asc")
  );

  const [reciepientsSnapshot] = useCollection(
    db.collection("users").where('email','==',getRecipientEmail(chat.users,user))
  );
  const showMessages = () => {
      if(messagesSnapshot){
        return messagesSnapshot.docs.map((message) => (
            <Message
              key={message.id}
              user = {message.data().user}
              message ={{
                ...message.data(),
                timestamp: message.data().timestamp?.toDate().getTime(),
              }}
            />
        ))
      }else{
        return JSON.parse(messages).map(message => (
          <Message key={message.id} user={message.user} message={message}/>

        ))
      }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    //update the last seen
    db.collection('users').doc(user.uid).set({
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    },{merge : true});

    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,

    })

    setInput("");

  };
  
  const exitChat =  () => {
      router.push(`/`);
  }

  const recipient = reciepientsSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users,user);

  return (
    <Container>
      <Header>
        <IconButton>
            <ArrowBackIosIcon onClick={exitChat}/>
        </IconButton>
        {recipient?(
          <Avatar src={recipient?.photoURL} sx={{ width: 60, height: 60, margin:2 }}/>
        ):(
          <Avatar sx={{ width: 60, height: 60 }}>{recipientEmail[0]}</Avatar>
        )
        }
        <HeaderInformation>
            <h3>{recipientEmail}</h3>
            {reciepientsSnapshot? (
              <p>Last Active:{' '}
              {recipient?.lastSeen?.toDate()?(
                <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
              ):"Unavailable"}
              </p>
            ):(
              <p>Loading last Active</p>
            )}
        </HeaderInformation>
        <HeaderIcons>
          
          <IconButton>
            <AttachFileIcon/>
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
          {/**List of messages*/}
          {showMessages()}
          <EndofMessages/>
      </MessageContainer>
      <InputContainer>
        <InsertEmoticonIcon/>
        <Input placeholder="Type here" value={input} onChange={e => setInput(e.target.value)}/>
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <MicIcon/>
      </InputContainer>

    </Container>
  )
}

export default ChatScreen


const Input = styled.input`
  flex : 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  align-items: center;
  position:sticky;
  padding: 20px;
  bottom: 0;
  background-color: whitesmoke;
  margin-left: 15px;
  margin-right: 15px;
  color: black;

`;

const InputContainer = styled.form`
  display : flex;
  align-items: center;
  padding : 10px;
  position : sticky;
  bottom : 0;
  background-color: white;
  z-index: 100
`;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const EndofMessages = styled.div`

  margin-bottom:50px
`;

const Container = styled.div``;

const Header = styled.div`
  position : sticky;
  background-color : white;
  z-index: 100;
  top : 0;
  display : flex;
  padding : 11px;
  height : 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke
`;

const HeaderInformation = styled.div`
  flex: 1;

  > h3{
    margin-bottom : 3px;
  }

  > p{
    font-size: 14px;
    color: gray;
  }
`;
const HeaderIcons = styled.div``;