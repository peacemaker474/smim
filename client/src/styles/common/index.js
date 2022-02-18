import styled from "styled-components";

// screen reader에서만 읽히는 h1태그가 필요할 때 사용하세요
export const SrOnlyH1 = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
