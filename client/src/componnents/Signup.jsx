import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
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

const Signup = () => {
  const dispatch = useDispatch()
  const [buttonLoading,setButtonLoading] = useState(false)
  const [buttonDisabled,setButtonDisabled] = useState(false)
  const [email,setEmail] = useState()
  const [name,setName] = useState()
  const [password,setPassword] = useState()
  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields")
      return false
    }
    return true
  }
  const handleSignUp = async ({setOpenAuth}) => {
    setButtonLoading(true)
    setButtonDisabled(true)

    if (validateInputs) {
      await UserSignUp({ email, password }).then((res) => {
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
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
      <TextInput 
          label="Email Address" 
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput 
          label="Full Name" 
          placeholder="Enter your full name" 
          value={name}
          handelChange={(e) => setName(e.target.value)}
        />
        <TextInput 
          label="Password" 
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />
        <Button text="Sign Up" />
      </div>
    </Container>
  )
};

export default Signup;
