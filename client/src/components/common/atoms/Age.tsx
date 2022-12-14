import styled from 'styled-components';

interface UserAgeProps {
  margin?: string;
  children: number;
  lineHeight?: string;
}

const AgeSpan = styled.span<{ margin?: string; lineHeight?: string; age: string }>`
  display: inline-block;
  border: 1px solid ${({ age }) => age};
  border-radius: 9px;
  padding: 4px;
  font-size: 10px;
  font-weight: 600;
  margin: ${({ margin }) => margin};
  line-height: ${({ lineHeight }) => lineHeight};
  color: ${({ age }) => age};
`;

function UserAge({ margin, lineHeight, children }: UserAgeProps) {
  const ageColor: { [key: string]: string } = {
    10: '#AD5D98',
    20: '#019B77',
    30: '#8BAAD8',
    40: '#945253',
    50: '#5F4A8B',
  };

  const age = String(children);

  return (
    <AgeSpan margin={margin} lineHeight={lineHeight} age={ageColor[age]}>
      {children}대
    </AgeSpan>
  );
}

export default UserAge;
