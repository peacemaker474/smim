import styled from 'styled-components';
import { useAppDispatch } from '../../../redux/hooks';
import { modalToggle } from '../../../redux/slice/toggleSlice';
import Button from '../../common/atoms/Button';

interface formStateProps {
  formState: string;
}

function Buttons({ formState }: formStateProps) {
  const dispatch = useAppDispatch();

  const handleFormCancle = () => {
    dispatch(modalToggle());
  };

  return (
    <BtnWrap>
      <BtnDiv>
        <Button type="button" height="2rem" width="5rem" onClick={handleFormCancle}>
          {formState === 'create' ? '작성 취소' : '수정 취소'}
        </Button>
        <Button type="submit" height="2rem" width="5rem">
          {formState === 'create' ? '게시물 등록' : '재등록'}
        </Button>
      </BtnDiv>
    </BtnWrap>
  );
}
export default Buttons;

const BtnWrap = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
`;

const BtnDiv = styled.div`
  width: 183px;
  display: flex;
  justify-content: space-between;
`;
