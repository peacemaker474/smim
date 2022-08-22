import React, { useCallback } from 'react';
import ModalPresenter from './Modal.style';

function Modal({ children, actionFunc, cancelFunc }) {
  const handleModalCancle = useCallback(
    (e) => {
      e.stopPropagation();
      cancelFunc();
    },
    [cancelFunc]
  );
  const handleModalConfirm = useCallback(
    (e) => {
      e.stopPropagation();
      actionFunc();
    },
    [actionFunc]
  );
  return (
    <ModalPresenter onModalCancle={handleModalCancle} onModalConfirm={handleModalConfirm}>
      {children}
    </ModalPresenter>
  );
}
export default Modal;
