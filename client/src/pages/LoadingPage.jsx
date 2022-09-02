import React from 'react';
import { HashLoader } from 'react-spinners';
import styled from 'styled-components';

const LoadingWrapper = styled.section`
  position: ${({ position }) => (position ? `${position}` : 'fixed')};
  top: ${({ top }) => (top ? `${top}` : '50%')};
  left: ${({ left }) => (left ? `${left}` : '50%')};
`;

export default function LoadingPage({ position, top, left }) {
  return (
    <LoadingWrapper position={position} top={top} left={left}>
      <HashLoader />
    </LoadingWrapper>
  );
}
