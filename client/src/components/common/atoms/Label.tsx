import styled from 'styled-components';

interface LabelProps {
  margin: string;
  children: string;
  fontSize: string;
  htmlFor?: string | undefined;
}

const LabelTitle = styled.label<{ margin: string; fontSize: string; }>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: bold;
  margin: ${({ margin }) => margin};

  @media ${({ theme }) => theme.device.mobile } {
    font-size: 0.8rem;
  }
`;

function Label ({ margin, children, fontSize, htmlFor }: LabelProps) {
  return (
    <LabelTitle
      margin={margin}
      fontSize={fontSize}
      htmlFor={htmlFor}
    > 
      {children}
    </LabelTitle>
  );
}

export default Label;