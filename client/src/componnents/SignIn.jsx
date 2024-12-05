import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
// import { openSnackbar } from "../redux/reducers/snackbarSlice";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.secondary + 90};
`;
const TextButton = styled.div`
  width: 100%;
  text-align: end;
  color: ${({ theme }) => theme.secondary + 90};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  font-weight: 500;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const SignIn = ({ setOpenAuth }) => {
  const dispatch = useDispatch()
  const [buttonLoading,setButtonLoading] = useState(false)
  const [buttonDisabled,setButtonDisabled] = useState(false)
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()

  const validateInputs = () => {
    if(!email || !password){
      alert("Please fill in all fields")
      return false
    }
    return true
  }
  const handleSignIn = async() => {
    setButtonLoading(true)
    setButtonDisabled(true)

    if(validateInputs){
      await UserSignIn({email,password}).then((res) => {
        dispatch(loginSuccess(res.data))
        setOpenAuth(false)
      }).catch((err) => {
        alert(err.response.data.message)
      }).finally(() => {
        setButtonLoading(false)
        setButtonDisabled(false)
      })
    }
  }

  return (
    <Container>
      <div>
        <Title>Welcome to Airbnb</Title>
        <span>Please login with your details here</span>
      </div>
      <div style={{display: "flex", gap:"20px",flexDirection:"column"}}>
        <TextInput 
          label="Email Address" 
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput 
          label="Password" 
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />
        <TextButton>Forgot Password?</TextButton>
        <Button text="Sign In" onClick={handleSignIn}/>
      </div>
    </Container>
  )
};

export default SignIn;
