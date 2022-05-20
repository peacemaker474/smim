import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { DropDownBox, DropDownContainer, DropDownItemBtn } from '../../../styles/common/dropdown';
import { postDelete } from '../../../network/post/http';
import { getCookie } from '../../../utils/cookie';

function DropDown({ postId }, ref) {
  const tkn = getCookie('users');
  let navigate = useNavigate();

  const handlePostEdit = (e) => {
    e.preventDefault();
    navigate(`/posts/edit/${postId}`);
  };
  const handlePostDel = async (e) => {
    e.preventDefault();
    console.log('삭제');
    const response = await postDelete(postId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`,
      },
    });
    console.log(response);
  };
  return (
    <PostDropDownContainer ref={ref}>
      <PostDropDownBox>
        <PostDropDownBtn onClick={handlePostEdit}>수정</PostDropDownBtn>
        <PostDropDownBtn onClick={handlePostDel}>삭제</PostDropDownBtn>
      </PostDropDownBox>
    </PostDropDownContainer>
  );
}
export const PostDropDown = React.forwardRef(DropDown);

const PostDropDownContainer = styled(DropDownContainer)`
  height: auto;
`;

const PostDropDownBox = styled(DropDownBox)``;

const PostDropDownBtn = styled(DropDownItemBtn)``;
