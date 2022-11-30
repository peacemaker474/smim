import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getDeleteCommentId, getPinnedCommentId, getUnpinnedCommentId } from '../../../redux/slice/commentSlice';
import { commentModalToggle, isLoginCheckToggle } from '../../../redux/slice/toggleSlice';

interface CommentDropdownProp {
  dropdownRef: any;
  onClickShow: (state: boolean) => void;
  writer: string;
  commentId: string;
  parentId: string | null;
  isDropdownVisible: boolean;
}

export default function CommentDropdown({
  dropdownRef,
  onClickShow,
  writer,
  commentId,
  parentId,
  isDropdownVisible,
}: CommentDropdownProp) {
  const dispatch = useAppDispatch();
  const { pinnedId } = useAppSelector((state) => state.comment);
  const { accessToken } = useAppSelector((state) => state.auth);
  const { name } = useAppSelector((state) => state.user);
  const { postWriter } = useAppSelector((state) => state.post);

  const handleCommentEdit = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      e.preventDefault();
      onClickShow(true);
    },
    [onClickShow],
  );

  const handleCommentDel = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      e.preventDefault();
      dispatch(getDeleteCommentId(commentId));
      dispatch(commentModalToggle());
    },
    [dispatch, commentId],
  );

  const handleCommentPinned = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      e.preventDefault();
      dispatch(getPinnedCommentId(commentId));
      dispatch(commentModalToggle());
    },
    [dispatch, commentId],
  );

  const handleCommentUnpinned = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      e.preventDefault();
      dispatch(getUnpinnedCommentId(commentId));
      dispatch(commentModalToggle());
    },
    [dispatch, commentId],
  );

  const handleCommentDeclaration = useCallback(() => {
    if (!accessToken) {
      dispatch(isLoginCheckToggle());
    }
  }, [accessToken, dispatch]);

  return (
    <CommentDropdownWrraper ref={dropdownRef}>
      <CommentDropdownLists>
        {name === postWriter && !parentId ? (
          <div>
            {commentId === pinnedId ? (
              <CommentDropdownList onClick={handleCommentUnpinned}>고정해제</CommentDropdownList>
            ) : (
              <CommentDropdownList onClick={handleCommentPinned}>고정</CommentDropdownList>
            )}
          </div>
        ) : null}

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
