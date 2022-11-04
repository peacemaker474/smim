import styled from 'styled-components';

interface SpanProps {
  children: string;
  fontSize: string;
}

const Text = styled.span<SpanProps>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: bold;
`;

function Span ({ children, fontSize }: SpanProps) {
  return (
    <Text fontSize={fontSize}>
      {children}
    </Text>
  );
}

export default Span;