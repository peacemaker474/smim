import React from "react";
import styled from 'styled-components';
import SignupForm from "../components/signup/SignupForm/SignupForm";

const SignupContainer = styled.section`
  max-width: 890px;
  max-height: 1000px;
  width: 50vw;
  height: 95vh;
  margin: 0 auto;
  padding-top: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1180px) {
    width: 70vw;
    padding-top: 10vw;
  }

  @media screen and (max-width: 600px) {
    width: 100vw;
    padding-top: 20vw;
  }
`;

const SignupTitle = styled.h1`
  font-size: 1.5rem;
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
