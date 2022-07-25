import React from 'react';
import styled from 'styled-components';
import {
  DropdownLists,
  DropdownWrraper,
  DropdownList,
  DropdownLink,
} from '../../../../styles/common/dropdown';

export default function PostDropdownPresenter({ forwardRef, handlePostDel, postId }) {
  return (
    <PostDropdownWrraper ref={forwardRef}>
      <PostDropdownLists>
        <PostDropdownList>
          <PostDropdownLink to={`/post/edit/${postId}`}>수정</PostDropdownLink>
        </PostDropdownList>
        <PostDropdownList onClick={handlePostDel}>삭제</PostDropdownList>
      </PostDropdownLists>
    </PostDropdownWrraper>
  );
}

const PostDropdownWrraper = styled(DropdownWrraper)`
  height: auto;
`;

const PostDropdownLists = styled(DropdownLists)``;

const PostDropdownList = styled(DropdownList)``;

const PostDropdownLink = styled(DropdownLink)``;
