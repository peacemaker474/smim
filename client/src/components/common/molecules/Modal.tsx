import styled from 'styled-components';
import Button from '../atoms/Button';

interface ModalProps {
  cancelFunc: () => void;
  actionFunc: () => void;
  children: string;
}

function Modal({ children, cancelFunc, actionFunc }: ModalProps) {
  const handleModalCancle = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    cancelFunc();
  };
  const handleModalConfirm = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    actionFunc();
  };
  return (
    <ModalContainer>
      <ModalOverlay onClick={handleModalCancle} />
      <ModalBox>
        <ModalText>{children}</ModalText>
        <BtnBox>
          <Button type="button" width="5rem" height="2rem" onClick={handleModalConfirm}>
            확인
          </Button>
          <Button type="button" width="5rem" height="2rem" onClick={handleModalCancle}>
            취소
          </Button>
        </BtnBox>
      </ModalBox>
    </ModalContainer>
  );
}
export default Modal;

const ModalContainer = styled.div``;

const ModalOverlay = styled.div`
  z-index: 1004;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ModalBox = styled.div`
  width: 410px;
  padding: 60px 0 23px;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1006;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 612px) {
    width: 314px;
  }
`;
const ModalText = styled.h2`
  margin: 0 auto;
  width: 241px;
  white-space: pre-line;
  line-height: 25px;
  text-align: center;
`;
const BtnBox = styled.div`
  width: 127px;
  margin: 25px auto;
  display: flex;
  gap: 15px;
`;
