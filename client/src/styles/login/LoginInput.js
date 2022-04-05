import styled from 'styled-components';

export const LoginLabel = styled.label`
  font-size: 18px;
  font-weight: bold;
  align-self: flex-start;
  padding: 0 0 0 15px;
  &:not(:first-child) {
    padding-top: 20px;
  }
`;

export const LoginInput = styled.input`
  all: unset;
  width: 90%;
  height: 12%;
  border: 1px solid rgba(12, 12, 12, .4);
  border-radius: 5px;
  padding-left: 10px;
  margin-bottom: -5px;
`;