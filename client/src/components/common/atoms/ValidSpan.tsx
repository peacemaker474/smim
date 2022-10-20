import styled from 'styled-components';

interface ValidProps {
  padding?: string;
  children: string;
}

const ValidCheck = styled.span`
  font-size: 0.5rem;
  font-weight: bold;
  align-self: flex-end;
  color: red;
  margin: 0;
  @media ${({ theme }) => theme.device.mobileMiddle} {
    font-size: 0.6rem;
  }
`;

const LoginValid = styled(ValidCheck)`
  padding: 0.6em 0.3em 0 0;
`;

function ValidSpan ({ padding, children }: ValidProps) {
  return (
    <ValidCheck>
      {children}
    </ValidCheck>
  );
}

export default ValidSpan;