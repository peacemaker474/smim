import React from 'react';
import ModalPresenter from './Modal.style';

function Modal({ children, showModal, actionfunc }) {
  const handleModalCancle = () => {
    showModal();
  };
  const handleModalConfirm = () => {
    actionfunc();
  };
  return (
    <ModalPresenter handleModalCancle={handleModalCancle} handleModalConfirm={handleModalConfirm}>
      {children}
    </ModalPresenter>
  );
}
export default Modal;
