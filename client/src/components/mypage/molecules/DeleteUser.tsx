import styled from 'styled-components';
import DeleteBtns from '../atoms/DeleteBtns';
import DeleteText from '../atoms/DeleteText';

function DeleteUser () {
  return (
    <DeleteWrapper>
      <DeleteText />
      <DeleteBtns />
    </DeleteWrapper>
  );
}

export default DeleteUser;

const DeleteWrapper = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;

  @media screen and (max-width: 1180px) {
    width: 90%;
    height: 80%;
  }
  @media screen and (max-width: 769px) {
    height: 50%;
  }
  @media screen and (max-width: 375px) {
    width: 100%;
  }
  @media screen and (max-height: 796px) {
    height: 70%;
  }
`;