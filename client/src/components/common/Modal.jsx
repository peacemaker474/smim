import React from 'react';
import styled from 'styled-components';
import { ColorBtn } from '../../styles/common/buttons';

const ModalContainer = styled.div`
  z-index: 4;
  background: #cacaca;
  postiion: absolute;
  top: 0;
  left: 0;
  widht: 100%;
  height: 100%;
`;
const ModalBox = styled.div`
  width: 410px;
  height: 197px;
  position: absolute;
  top: 50%;
  left: 50%;
  background: #fff;
  transform: translateX(-50%) translateY(-50%);
`;
const ModalText = styled.h2``;
const BtnBox = styled.div`
  width: 160px;
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

function Modal({ children, showModal, actionfunc }) {
  const handleModalCancle = () => {
    showModal();
  };
  const handleModalConfirm = () => {
    actionfunc();
  };
  return (
    <ModalContainer>
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
export default Modal;
