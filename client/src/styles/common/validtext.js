import React from 'react';
import styled from 'styled-components';

export const ValidCheck = React.memo(styled.span`
  font-size: 12px;
  font-weight: bold;
  align-self: flex-end;
  font-size: 11px;
  color: red;
  margin-top: 10px;
`);

export const LoginValid = styled(ValidCheck)`
  opacity: ${({validLogin}) => validLogin !== undefined ? "1" : "0"};
  align-self: flex-end;
  padding-right: 20px;
  margin-top: 5px;
`;

export const MyPageValid = styled(ValidCheck)`
  font-size: 12px;
  margin: 0;
`;