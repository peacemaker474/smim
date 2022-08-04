import React from 'react';
import styled from 'styled-components';

export const ValidCheck = React.memo(styled.span`
  font-size: 12px;
  font-weight: bold;
  align-self: flex-end;
  font-size: 11px;
  color: red;
  margin-top: 10px;

  @media screen and (max-width: 500px) {
    font-size: 0.6rem;
  }
`);

export const LoginValid = styled(ValidCheck)`
  font-size: 0.65em;
  align-self: flex-end;
  margin: 0;
  padding: 0.9em 0.5em 0 0;
`;

export const MyPageValid = styled(ValidCheck)`
  font-size: 0.5em;
`;