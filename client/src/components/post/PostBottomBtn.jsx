import React from 'react'
import styled from 'styled-components';
import { ColorBtn } from '../../styles/common/buttons'

function PostBottomBtn() {


  const BtnWrap = styled.div`
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 550px) {
      width: 450px;
    }
  `;

  const LeftBtn = styled.div`
    width: 200px;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 550px) {
      width: 180px;
    }
  `;

  const RightBtn = styled.div`
    width: 200px;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 550px) {
      width: 180px;
    }
  `;



  return (
    <BtnWrap>
      <LeftBtn>
        <ColorBtn width={"5rem"} palette={"gray"} > 임시 저장 </ColorBtn>
        <ColorBtn width={"5rem"} palette={"gray"} > 불러 오기 </ColorBtn>
      </LeftBtn>
      <RightBtn>
        <ColorBtn width={"5rem"} palette={"yellow"} > 작성 취소</ColorBtn>
        <ColorBtn width={"5rem"} palette={"yellow"} > 게시물 등록 </ColorBtn>
      </RightBtn>
    </BtnWrap>
  );
}

export default PostBottomBtn
