import styled from 'styled-components';

interface IconWithValueProps {
  icon: string;
  value: string;
}

const WithValue = styled.span<{ icon: string }>`
  display: flex;
  align-items: center;
  font-size: 12px;
  &::before {
    width: 16px;
    height: 16px;
    background: url(${({ icon }) => icon});
    display: block;
    content: '';
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: 4px;
  }
  & + span {
    margin-left: 10px;
  }
`;

function IconWithValue({ icon, value }: IconWithValueProps) {
  return <WithValue icon={icon}>{value}</WithValue>;
}

export default IconWithValue;
