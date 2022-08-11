import React from 'react';
import styled from 'styled-components';

export const ValidCheck = React.memo(styled.span`
  font-size: 0.65rem;
  font-weight: bold;
  align-self: flex-end;
  color: red;
  margin-top: 10px;

  @media ${({ theme }) => theme.device.mobileMiddle} {
    font-size: 0.6rem;
  }
`);

export const LoginValid = styled(ValidCheck)`
  margin: 0;
  padding: 0.6em 0.3em 0 0;

  @media screen and (max-width: 400px) {
    font-size: 0.45rem;
  }
`;

export const MyPageValid = styled(ValidCheck)`
  font-size: 0.5rem;
`;