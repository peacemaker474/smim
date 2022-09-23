import React from 'react';
import ModalPresenter from './Modal.style';

function Modal({ children, actionFunc, cancelFunc }) {
  const handleModalCancle = (e) => {
    e.stopPropagation();
    cancelFunc();
  };
  const handleModalConfirm = (e) => {
    e.stopPropagation();
    actionFunc();
  };

  return (
    <ModalPresenter onModalCancle={handleModalCancle} onModalConfirm={handleModalConfirm}>
      {children}
    </ModalPresenter>
  );
}
export default Modal;
