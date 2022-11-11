import styled from "styled-components";

export const MyPageInputWrapper = styled.div`
  width: 90%;
  height: 30%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ChangeInputWrapper = styled.div`
  height: 25%;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.device.ipad} {
    input {
      height: 60%;
    }
  }
`;