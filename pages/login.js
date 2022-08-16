import { Button } from "@mui/material";
import Head from "next/head";
import styled from "styled-components";
import { auth,provider } from "../firebase";


function Login() {

  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <Container>
      <Head>
        <title>Log_In</title>
      </Head>
      <LoginContainer>
        <Logo 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_c97nQI3oAvAUYX-gcZQPeHDvznNCq1lMXw&usqp=CAU"
          />
          <Button onClick={signIn} variant="outlined" >Sign in with Google</Button>
      </LoginContainer>
    </Container>
  )

  

}

export default Login;

const Logo = styled.img`
  height: 250px;
  width: 250px;
  margin-bottom:40px;
  border-radius: 25px;
`;
const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  box-shadow:  0px 4px 14px -3px rgba(0,0,0,0.7 );

`;
const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke
`;
