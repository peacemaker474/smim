import styled from 'styled-components';

export const SignupInput = styled.input`
  all: unset;
  width: 100%;
  height: 55%;
  border: 2px solid ${({theme}) => theme.color.yellow};
  padding-left: 10px;
  box-sizing: border-box;
  border-radius: 5px;
`;

export const BirthYear = styled.input`
  all: unset;
  width: 30%;
  height: 100%;
  border: 2px solid ${({theme}) => theme.color.yellow};
  padding-left: 10px;
  box-sizing: border-box;
  border-radius: 5px;
`;

export const BirthMonth = styled.select`
  all: unset;
  width: 30%;
  height: 100%;
  border: 2px solid ${({theme}) => theme.color.yellow};
  padding: 12px 0 0 10px;
  box-sizing: border-box;
  border-radius: 5px;
`;

export const MyInfoInput = styled.input`
  width: 100%;
  height: 50%;
  border: 1px solid black;
  font-size: 1em;
  border-radius: 5px;
  padding-left: 15px;
  box-sizing: border-box;

  @media screen and (max-width: 769px) {
    height: 40%;
  }
`;

export const ChangePwInput = styled(MyInfoInput)`
  height: 70%;

  @media screen and (max-width: 769px) {
    height: 60%;
  }
`;