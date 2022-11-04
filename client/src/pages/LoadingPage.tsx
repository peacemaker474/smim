import { HashLoader } from 'react-spinners';
import styled from 'styled-components';

const LoadingWrapper = styled.section<LoadingProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function LoadingPage() {
  return (
    <LoadingWrapper>
      <HashLoader />
    </LoadingWrapper>
  );
}