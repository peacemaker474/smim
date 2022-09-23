import React from 'react';
import styled from 'styled-components';
import {
  DropdownLists,
  DropdownWrraper,
  DropdownList,
  DropdownLink,
} from '../../../../styles/common/dropdown';

export default function PostDropdownPresenter({ forwardRef, onPostDel, postId }) {
  return (
    <PostDropdownWrraper ref={forwardRef}>
      <PostDropdownLists>
        <PostDropdownList>
          <PostDropdownLink to={`/post/edit/${postId}`}>수정</PostDropdownLink>
        </PostDropdownList>
        <PostDropdownList onClick={onPostDel}>삭제</PostDropdownList>
      </PostDropdownLists>
    </PostDropdownWrraper>
  );
}

const PostDropdownWrraper = styled(DropdownWrraper)`
  height: auto;
  width: 64px;
  top: 27px;
`;

const PostDropdownLists = styled(DropdownLists)``;

const PostDropdownList = styled(DropdownList)`
  line-height: 34px;
`;

const PostDropdownLink = styled(DropdownLink)`
  width: 100%;
  height: 100%;
  display: inline-block;
`;
