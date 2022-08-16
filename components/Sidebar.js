import styled from "styled-components";
import { Avatar, IconButton,Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
//import { collection,query, where , addDoc } from "firebase/firestore"; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from "../components/Chat";
import {useRouter} from "next/router";

function Sidebar() {
    
    
    const [user] = useAuthState(auth);
    const userChatref = db.collection('chats').where('users','array-contains',user.email);
    const [chatsSnappshot] = useCollection(userChatref);
    
    //creating the chat function
    const createChat = () => {
        const input = prompt("Please enter an Email Address for the user to chat with");
        
        if(!input){
            return null;
        }

        if(EmailValidator.validate(input) && !chatAlreadyExists(input) &&  input !== user.email){
            //this where the need to add the chat to db
            db.collection('chats').add({
                users: [user.email,input]
            });
        }
    };

    const chatAlreadyExists = (recipientEmail) => {
        !!chatsSnappshot?.docs.find(
            (chat) => chat.data().users.find(
                (user) => user === recipientEmail)?.length > 0
        );
    };

    const recipientEmail = user.email.toString();

    const  router = useRouter();
    const exitChat =  () => {
      router.push(`/`);
    }
   
    return (
    
    <Container>
        <Header>
            {/*<UserAvater src={user.photoURL} onClick={() => auth.signOut()} />*/}
            {user ? (
            <UserAvater src={user?.photoURL} sx={{ width: 60, height: 60 }} onClick={() => auth.signOut()}/>
            ):(
            <UserAvater onClick={() => auth.signOut()}>{recipientEmail[0]}</UserAvater>
            )}
            <p>{user?.displayName}</p>
            <IconContainer>
                <IconButton>
                    <ChatIcon onClick={exitChat}/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </IconContainer>
        </Header>
        <SearchContainer>
            <SearchIcon/>
            <SearchInput placeholder="Search your chats"/>
        </SearchContainer>
        <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

        {/* List of chats*/}
        <ChatContainer >
            {chatsSnappshot?.docs.map((chat) => (
                <Chat key={chat.id} id = {chat.id} users={chat.data().users}>

                </Chat>
            ))}
        </ChatContainer>


    </Container>
  );
}

export default Sidebar;



const ChatContainer = styled.div`
    background-color: #e9eaeb;
    border-radius: 15px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
`;


const SidebarButton = styled(Button)`
    width: 100%;
    &&&{
        border-top:2px solid whitesmoke;
        border-bottom: 2px solid whitesmoke;
    }
    border-radius: 10%;

`;

const SearchInput = styled.input`
    outline-width: 0;
    outline: none;
    border: none transparent;
    border-radius: 20px;
    padding: 10px;
    flex:1;
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: groove;
    background-color: #eee;
    color: black;

    :focus {
        outline: none;
    }
`;
const SearchContainer = styled.div`
    display:flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;


`;

const IconContainer = styled.div`
`
const UserAvater = styled(Avatar)`
    cursor: pointer;
    margin-left: 20px;
    :hover{
        opacity: 0.8;
    };
    width: 60;
    height: 60 ;
`;

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    font-size: 20px;
    color: white;
    border-bottom: 1px solid whitesmoke;
    background-image: linear-gradient(to right bottom, #4fc0e6, #32c5df, #20cad3, #2dcdc2, #48cfaf);
`;
const Container = styled.div`
    font-family: 'Exo 2', sans-serif;
    flex: 0.45;
    border-right: 1px sold whitesmoke;
    height: 100vh ;
    min-width: 150px;
    max-width: 350px;
    overflow-y : scroll;

    ::-webkit-scrollbar{
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width : none;
`;



