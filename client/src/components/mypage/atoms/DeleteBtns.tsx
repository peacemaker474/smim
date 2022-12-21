import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteUser } from '../../../networks/mypage/http';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getUserLogOut } from '../../../redux/services/UserService';
import { DELETE_TOKEN } from '../../../redux/slice/authSlice';
import Button from '../../common/atoms/Button';

function DeleteBtns () {
  const { id } = useAppSelector((state) => state.user);
  const { accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCancelDelete = () => {
    navigate('/my');
  }

  const handleDeleteUser = () => {
    const body = {
      userId: id,
      accessToken,
    };

    deleteUser(body)
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          dispatch(getUserLogOut());
          dispatch(DELETE_TOKEN());
          navigate('/');
        }
      })
      .catch((err) => {
        if (!err.response.data.sucess) {
          alert(err.response.data.message);
        }
      })
  }

  return (
    <ButtonWrapper>
      <DeleteButton onClick={handleDeleteUser}> 회원탈퇴 </DeleteButton>
      <Button width='100px' height='50px' border='none' onClick={handleCancelDelete}> 
        취소
      </Button>
    </ButtonWrapper>
  );
}

export default DeleteBtns;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

const DeleteButton = styled.button`
  width: 100px;
  height: 50px;
  padding: 0;
  background-color: red;
  border-radius: 4px;
  font-weight: 700;
  color: rgb(255, 255, 255);
  line-height: 50px;
  text-align: center;
`;