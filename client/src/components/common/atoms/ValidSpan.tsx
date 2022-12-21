import styled from 'styled-components';

interface ValidProps {
  padding: string;
  children: React.ReactNode;
}

const ValidCheck = styled.span<{ padding: string }>`
  font-size: 0.5rem;
  font-weight: bold;
  align-self: flex-end;
  color: red;
  margin: 0;
  padding: ${({ padding }) => padding};
  @media ${({ theme }) => theme.device.mobileMiddle} {
    font-size: 0.6rem;
  }
`;

function ValidSpan ({ padding, children }: ValidProps) {
  return (
    <ValidCheck padding={padding}>
      {children}
    </ValidCheck>
  );
}

export default ValidSpan;