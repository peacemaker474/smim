import React from 'react';
import styled from 'styled-components';

export const LoginLabel = React.memo(styled.label`
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 10px;

  @media ${({ theme }) => theme.device.mobile } {
    font-size: 0.8rem;
  }
`);

export const LoginInput = styled.input`
  all: unset;
  width: 95%;
  height: 40%;
  border: 1px solid rgba(12, 12, 12, .4);
  border-radius: 5px;
  padding-left: 10px;
  font-size: 0.8rem;

  @media ${({ theme }) => theme.device.mobile } {
    font-size: 0.7rem;
  }
`;