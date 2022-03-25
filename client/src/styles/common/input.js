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