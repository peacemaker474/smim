import React, { useCallback } from 'react';
import styled from 'styled-components';
import useCmntDropdown from '../../../hooks/useCmntDropdown';
import { useAppSelectorTyped } from '../../../redux/hooks';

interface CommentDropdownProp {
  dropdownRef: any;
  onClickShow: (state: boolean) => void;
  writer: string;
  commentId: string;
  parentId: string | null;
}

export default function CommentDropdown({
  dropdownRef,
  onClickShow,
  writer,
  commentId,
  parentId,
}: CommentDropdownProp) {
  const { name, postWriter } = useAppSelectorTyped((state) => ({
    name: state.user.name,
    postWriter: state.post.postWriter,
  }));
  const [pinnedText, handleCommentDel, handleCommentPinned, handleCommentDeclaration] = useCmntDropdown(commentId);

  const handleCommentEdit = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      e.preventDefault();
      onClickShow(true);
    },
    [onClickShow],
  );

  return (
    <CommentDropdownWrraper ref={dropdownRef}>
      <CommentDropdownLists>
        {name === postWriter && !parentId && (
          <CommentDropdownList onClick={handleCommentPinned}>{pinnedText}</CommentDropdownList>
        )}
        {name === writer ? (
          <>
            <CommentDropdownList onClick={handleCommentEdit}>수정</CommentDropdownList>
            <CommentDropdownList onClick={handleCommentDel}>삭제</CommentDropdownList>
          </>
        ) : (
          <CommentDropdownList onClick={handleCommentDeclaration}>신고</CommentDropdownList>
        )}
      </CommentDropdownLists>
    </CommentDropdownWrraper>
  );
}

const CommentDropdownWrraper = styled.div`
  width: 76px;
  height: auto;
  background: #ffffff;
  box-shadow: 0 9px 25px rgb(0 0 0 / 15%);
  position: absolute;
  top: 34px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  border-radius: 9px;
  overflow: hidden;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const CommentDropdownLists = styled.ul`
  width: 100%;
  height: 100%;
  font-size: 13px;
`;

const CommentDropdownList = styled.li`
  width: 100%;
  height: 50%;
  text-align: center;
  line-height: 34px;
  cursor: pointer;
  &:hover {
    background-color: rgba(127, 127, 127, 0.1);
  }
`;
