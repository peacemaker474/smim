import styled from 'styled-components';

export const ValidCheck = styled.span`
  font-size: 12px;
  font-weight: bold;
  align-self: flex-end;
  font-size: 11px;
  color: ${({current}) => current ? "green" : "red"};
  margin-top: 10px;
`;