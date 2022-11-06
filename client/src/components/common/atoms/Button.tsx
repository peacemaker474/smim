import styled from 'styled-components';

interface ButtonProps {
  width: string;
  height: string;
  border: string;
  children: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
}

const CommonBtn = styled.button<{ width: string, height: string, border: string}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 0;
  background-color: ${({ theme }) => theme.color.yellow};
  border-radius: 4px;
  font-weight: 700;
  color: rgb(255, 255, 255);
  line-height: ${({ height }) => height};
  text-align: center;

  &:hover {
    border: ${({ border }) => border};
  }
`;

function Button ({ width, height, border, children, type, onClick }: ButtonProps) {
  return (
    <CommonBtn
      width={width}
      height={height}
      border={border}
      onClick={onClick}
      type={type}
    >
      {children}
    </CommonBtn>
  );
}

export default Button;