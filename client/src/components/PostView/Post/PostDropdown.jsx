import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { DropdownBox, DropdownContainer, DropdownItemBtn } from '../../../styles/common/dropdown';
import { deletePost } from '../../../network/post/http';
import { getCookie } from '../../../utils/cookie';

function Dropdown({ postId }, ref) {
  const tkn = getCookie('users');
  let navigate = useNavigate();

  const handlePostEdit = (e) => {
    e.preventDefault();
    navigate(`/posts/edit/${postId}`);
  };
  const handlePostDel = async (e) => {
    e.preventDefault();
    console.log('삭제');
    const response = await deletePost(postId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`,
      },
    });
    console.log(response);
  };
  return (
    <PostDropdownContainer ref={ref}>
      <PostDropdownBox>
        <PostDropdownBtn onClick={handlePostEdit}>수정</PostDropdownBtn>
        <PostDropdownBtn onClick={handlePostDel}>삭제</PostDropdownBtn>
      </PostDropdownBox>
    </PostDropdownContainer>
  );
}
export const PostDropdown = React.forwardRef(Dropdown);

const PostDropdownContainer = styled(DropdownContainer)`
  height: auto;
`;

const PostDropdownBox = styled(DropdownBox)``;

const PostDropdownBtn = styled(DropdownItemBtn)``;