import styled from 'styled-components';

const CommonInput = styled.input`
  border-radius: 5px;
  font-size: 0.8rem;
`;

export const LoginInput = styled(CommonInput)`
  width: 95%;
  height: 40%;
  border: 1px solid rgba(12, 12, 12, .4);
  padding-left: 10px;
`;