import React from 'react';
import styled from 'styled-components';
import { ColorBtn } from '../../../styles/common/buttons';

function ModalPresenter({ children, handleModalCancle, handleModalConfirm }) {
  return (
    <ModalContainer onClick={handleModalCancle}>
      <ModalBox>
        <ModalText>{children}</ModalText>
        <BtnBox>
          <Btn onClick={handleModalCancle}>취소</Btn>
          <Btn onClick={handleModalConfirm}>확인</Btn>
        </BtnBox>
      </ModalBox>
    </ModalContainer>
  );
}
export default ModalPresenter;

const ModalContainer = styled.div`
  z-index: 4;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;
const ModalBox = styled.div`
  width: 410px;
  height: 197px;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 65px 0;
  background: #fff;
  transform: translateX(-50%) translateY(-50%);
`;
const ModalText = styled.h2`
  margin: 0 auto;
  width: 235px;
`;
const BtnBox = styled.div`
  width: 160px;
  margin: 25px auto;
`;

const Btn = styled(ColorBtn)`
  background: ${({ theme }) => theme.color.yellow};
  border: none;
  & + button {
    margin-left: 15px;
  }
  &:hover {
    background: ${({ theme }) => theme.color.yellow};
    color: #fff;
  }
`;
