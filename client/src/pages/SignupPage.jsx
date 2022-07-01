import React from "react";
import styled from 'styled-components';
import SignupForm from "../components/signup/SignupForm/SignupForm";

const SignupContainer = styled.section`
  width: 50vw;
  height: 95vh;
  margin: 0 auto;
  margin-top: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignupTitle = styled.h1`
  font-size: 26px;
  margin: 0 0 10px 0;
  text-align: center;
  border-bottom: 3px solid black;
`;

export default function SignupPage() {
  return (
    <SignupContainer>
      <SignupTitle> 회원가입 </SignupTitle>
      <SignupForm />
    </SignupContainer>
  );
}
