import { HashLoader } from 'react-spinners';
import styled from 'styled-components';

interface LoadingProps {
  position?: string;
  top?: string;
  left?: string;
}

const LoadingWrapper = styled.section<LoadingProps>`
  position: ${({ position }) => (position ? `${position}` : 'fixed')};
  top: ${({ top }) => (top ? `${top}` : '50%')};
  left: ${({ left }) => (left ? `${left}` : '50%')};
  transform: ${({ top, left }) => (left && top ? `translate(-${left}, -${top})` : `translate(-50%, -50%)`)};
`;

export default function LoadingPage({ position, top, left }: LoadingProps) {
  return (
    <LoadingWrapper position={position} top={top} left={left}>
      <HashLoader />
    </LoadingWrapper>
  );
}
