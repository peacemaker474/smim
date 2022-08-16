import React from 'react';
import ModalPresenter from './Modal.style';

function Modal({ children, actionfunc, cancelFunc }) {
  const handleModalCancle = (e) => {
    e.stopPropagation();
    cancelFunc();
  };
  const handleModalConfirm = (e) => {
    e.stopPropagation();
    actionfunc();
  };
  return (
    <ModalPresenter onModalCancle={handleModalCancle} onModalConfirm={handleModalConfirm}>
      {children}
    </ModalPresenter>
  );
}
export default Modal;
