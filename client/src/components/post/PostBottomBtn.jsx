import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { ColorBtn } from '../../styles/common/buttons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
function PostBottomBtn() {
  const navigate = useNavigate();
  const postData = useSelector((state) => state.postReducer);
  const handleUpload = async (e, data) => {
    e.preventDefault();
    // user_id, title, tag[],content
    // content, hashArr, targetAge, title
    if (data.title === '') {
      console.log('제목을 입력해주세요');
    } else if (data.targetAge === 0) {
      console.log('연령층을 선택해주세요');
    } else if (data.content === '') {
      console.log('내용을 입력해주세요');
    } else {
      axios
        .post(
          'http://localhost:4000/posts/create',
          {
            title: data.title,
            content: data.content,
            tag: data.hashArr,
            targetAge: data.targetAge,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((res) => {
          console.log(res.data);

          navigate('/');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <BtnWrap>
      <LeftBtn>
        <ColorBtn width={'5rem'} palette={'gray'}>
          임시 저장
        </ColorBtn>
        <ColorBtn width={'5rem'} palette={'gray'}>
          불러 오기
        </ColorBtn>
      </LeftBtn>
      <RightBtn>
        <ColorBtn
          width={'5rem'}
          palette={'yellow'}
          onClick={() => {
            navigate('/');
          }}
        >
          작성 취소
        </ColorBtn>
        <ColorBtn
          width={'5rem'}
          palette={'yellow'}
          type='button'
          form='upload'
          onClick={(e) => handleUpload(e, postData)}
        >
          게시물 등록
        </ColorBtn>
      </RightBtn>
    </BtnWrap>
  );
}

export default PostBottomBtn;
