import styled from 'styled-components';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { postToggle } from '../../../redux/slice/toggleSlice';
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
    dispatch(postToggle());
  };

  const clickValue = (e: any) => {
    setValue(e.target.value);
  };

  const actionFunc = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result = null;

    if (check === 'report') {
      result = await commentReport(commentId, { type: value }, accessToken);
    } else {
      result = await postReport(postId, { type: value }, accessToken);
    }
    dispatch(postToggle());
    alert(result.data.message);
  };
  return (
    <ReportContainer>
      <ReportOverlay onClick={cancleFunc} />
      <ReportBoxDiv>
        <SelectTitle>{check === 'report' ? '댓글' : '게시글'} 신고</SelectTitle>
        <ReportForm id="test" method="post" onSubmit={actionFunc}>
          <SelectDiv>
            <label htmlFor="sexual">
              <input type="radio" id="sexual" name="type" value="sexual" onChange={clickValue} />
              음란물
            </label>
          </SelectDiv>
          <SelectDiv>
            <label htmlFor="abuse">
              <input type="radio" id="abuse" name="type" value="abuse" onChange={clickValue} />
              증오심 표현 또는 노골적인 폭력
            </label>
          </SelectDiv>
          <SelectDiv>
            <label htmlFor="malicious">
              <input type="radio" id="malicious" name="type" value="malicious" onChange={clickValue} />
              테러 조장
            </label>
          </SelectDiv>
          <SelectDiv>
            <label htmlFor="spam">
              <input type="radio" id="spam" name="type" value="spam" onChange={clickValue} />
              원치않는 상업성 콘텐츠 또는 스팸
            </label>
          </SelectDiv>
          <ButtonDiv>
            <Button width="48px" height="28px" type="button" onClick={cancleFunc}>
              취소
            </Button>
            <Button width="48px" height="28px" type="submit">
              신고
            </Button>
          </ButtonDiv>
        </ReportForm>
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
  & > div:not(:last-child) {
    margin-bottom: 9px;
  }
  & > div:last-child {
    margin-top: 20px;
  }
`;

const SelectDiv = styled.div``;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;
