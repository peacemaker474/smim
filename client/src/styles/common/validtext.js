import styled from 'styled-components';

export const ValidCheck = styled.span`
  font-size: 12px;
  font-weight: bold;
  align-self: flex-end;
  font-size: 11px;
  color: ${({current}) => current ? "green" : "red"};
  margin-top: 10px;
`;

export const LoginValid = styled(ValidCheck)`
  opacity: ${({validLogin}) => validLogin !== "" ? "1" : "0"};
  align-self: flex-end;
  padding-right: 20px;
  margin-top: 5px;
`;