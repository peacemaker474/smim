import React from 'react';
import ModalPresenter from './Modal.style';
import { useDispatch } from 'react-redux';
import { modalToggle } from '../../../redux/slice/toggleSlice';

function Modal({ children, actionfunc }) {
  const dispatch = useDispatch();
  const handleModalCancle = (e) => {
    e.stopPropagation();
    console.log('action');
    dispatch(modalToggle());
  };
  const handleModalConfirm = (e) => {
    e.stopPropagation();
    actionfunc();
    dispatch(modalToggle());
  };
  return (
    <ModalPresenter handleModalCancle={handleModalCancle} handleModalConfirm={handleModalConfirm}>
      {children}
    </ModalPresenter>
  );
}
export default Modal;
