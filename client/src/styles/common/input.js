import styled from 'styled-components';

export const SignupInput = styled.input`
  all: unset;
  width: 100%;
  height: 50%;
  font-size: 0.9rem;
  border: 2px solid ${({ theme }) => theme.color.yellow};
  padding-left: 10px;
  box-sizing: border-box;
  border-radius: 5px;

  @media ${({ theme }) => theme.device.ipad} {
    font-size: 0.8rem;
  }

  @media ${({ theme }) => theme.device.mobileMiddle} {
    font-size: 0.8rem;
  }
`;

export const BirthYear = styled.input`
  all: unset;
  width: 30%;
  height: 45px;
  border: 2px solid ${({ theme }) => theme.color.yellow};
  padding-left: 10px;
  box-sizing: border-box;
  border-radius: 5px;

  @media ${({ theme }) => theme.device.ipad} {
    height: 90%;
    font-size: 0.8rem;
  }

  @media ${({ theme }) => theme.device.mobileMiddle} {
    font-size: 0.7rem;
    padding-left: 10px;
  }
`;

export const BirthMonth = styled.select`
  all: unset;
  width: 30%;
  height: 45px;
  line-height: 1em;
  border: 2px solid ${({ theme }) => theme.color.yellow};
  padding: 12px 0 0 10px;
  box-sizing: border-box;
  border-radius: 5px;

  @media ${({ theme }) => theme.device.ipad} {
    height: 90%;
    font-size: 0.8rem;
  }

  @media ${({ theme }) => theme.device.mobileMiddle} {
    font-size: 0.7rem;
    padding-left: 10px;
  }
`;

export const MyInfoInput = styled.input`
  width: 100%;
  height: 50%;
  border: 1px solid black;
  font-size: 1em;
  border-radius: 5px;
  padding-left: 15px;
  box-sizing: border-box;

  @media ${({ theme }) => theme.device.ipad} {
    height: 40%;
  }
`;

export const ChangePwInput = styled(MyInfoInput)`
  height: 70%;

  @media ${({ theme }) => theme.device.ipad} {
    height: 60%;
  }
`;
