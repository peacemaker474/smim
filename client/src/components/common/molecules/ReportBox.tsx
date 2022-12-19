import styled from 'styled-components';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { postUploadToggle } from '../../../redux/slice/toggleSlice';
import { postReport } from '../../../networks/post/http';
import Button from '../atoms/Button';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { commentReport } from '../../../networks/comment/http';

type Params = {
  id: string;
};

export default function ReportBox() {
  const { id: postId } = useParams<keyof Params>() as Params;
  const { accessToken } = useAppSelector((state) => state.auth);
  const { commentId, check } = useAppSelector((state) => state.comment);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const cancleFunc = () => {
    dispatch(postUploadToggle());
  };

  const clickValue = (e: any) => {
    setValue(e.target.value);
  };

  const actionFunc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (check === 'report') {
      commentReport(commentId, { type: value }, accessToken);
    } else {
      postReport(postId, { type: value }, accessToken);
    }
    dispatch(postUploadToggle());
  };
  return (
    <ReportContainer>
      <ReportOverlay onClick={cancleFunc} />
      <ReportBoxDiv>
        <SelectTitle>{check === 'report' ? '댓글' : '게시글'} 신고</SelectTitle>
        <ReportForm id="test" method="post" onSubmit={actionFunc}>
          <SelectDiv>
            <input type="radio" id="1" name="type" value="1" onChange={clickValue} />
            <label htmlFor="1">음란물</label>
          </SelectDiv>
          <SelectDiv>
            <input type="radio" id="2" name="type" value="2" onChange={clickValue} />
            <label htmlFor="2">증오심 표현 또는 노골적인 폭력</label>
          </SelectDiv>
          <SelectDiv>
            <input type="radio" id="3" name="type" value="3" onChange={clickValue} />
            <label htmlFor="3">테러 조장</label>
          </SelectDiv>
          <SelectDiv>
            <input type="radio" id="4" name="type" value="4" onChange={clickValue} />
            <label htmlFor="4">원치않는 상업성 콘텐츠 또는 스팸</label>
          </SelectDiv>
        </ReportForm>
        <ButtonDiv>
          <Button width="48px" height="28px" type="button" onClick={cancleFunc}>
            취소
          </Button>
          <Button width="48px" height="28px" type="submit" form="test">
            신고
          </Button>
        </ButtonDiv>
      </ReportBoxDiv>
    </ReportContainer>
  );
}

const ReportContainer = styled.div``;

const ReportOverlay = styled.div`
  z-index: 1004;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ReportBoxDiv = styled.div`
  width: 415px;
  padding: 30px 25px;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1006;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 612px) {
    width: 314px;
  }
  & button + button {
    margin-left: 17px;
  }
`;

const SelectTitle = styled.h3`
  margin-bottom: 26px;
  font-weight: 600;
`;

const ReportForm = styled.form`
  margin-bottom: 26px;
`;

const SelectDiv = styled.div`
  & + div {
    margin-top: 9px;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
