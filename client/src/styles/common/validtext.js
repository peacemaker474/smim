import React from 'react';
import styled from 'styled-components';

export const ValidCheck = React.memo(styled.span`
  font-size: 0.9rem;
  font-weight: bold;
  align-self: flex-end;
  color: red;
  margin-top: 10px;
`);

export const LoginValid = styled(ValidCheck)`
  font-size: 0.65em;
  margin: 0;
  padding: 0.6em 0.3em 0 0;

  @media ${({ theme }) => theme.device.mobile } {
    font-size: 9px;
  }
`;

export const MyPageValid = styled(ValidCheck)`
  font-size: 0.5rem;
`;