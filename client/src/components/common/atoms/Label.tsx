import styled from 'styled-components';

const LabelTitle = styled.label`
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 10px;
  @media ${({ theme }) => theme.device.mobile } {
    font-size: 0.8rem;
  }
`;

function Label ({ children }: {children: string}) {
  return (
    <LabelTitle> {children} </LabelTitle>
  );
}

export default Label;