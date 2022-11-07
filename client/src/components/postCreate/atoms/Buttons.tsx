import styled from 'styled-components';
import Button from '../../common/atoms/Button';

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

function Buttons() {
  return (
    <BtnWrap>
      <BtnDiv>
        <Button type="button" height="2rem" border="2px solid black" width="5rem">
          작성 취소
        </Button>
        <Button type="submit" border="2px solid black" height="2rem" width="5rem">
          게시물 등록
        </Button>
      </BtnDiv>
    </BtnWrap>
  );
}
export default Buttons;
