import React from 'react';
import styled from 'styled-components';
import { CommentDropdown } from '../CommentDropdown/CommentDropdown';
import { DropdownBtn } from '../../../../styles/common/dropdown';
import CommentItemEtc from '../CommentItemEtc/CommentItemEtc';
import CommentInput from '../CommentInput/CommentInput';

export default function CommentItemPresenter({
  cmntData,
  btnRef,
  handleDropdownShow,
  isDropdownVisible,
  dropdownRef,
  groupId,
  isTargetVisible,
  handleClickShow,
  handleClickCancel,
  handleTextChange,
  itemText,
  deleteState,
}) {
  return (
    <>
      {isTargetVisible ? (
        <CommentInput
          postId={cmntData.post_id}
          parentId={cmntData.parent_id}
          groupId={groupId}
          isTargetVisible={isTargetVisible}
          handleClickCancel={handleClickCancel}
          text={itemText}
          id={cmntData._id}
          handleTextChange={handleTextChange}
        />
      ) : (
        <CommentItemInner>
          <ProfileImg />
          <CommentItemContent>
            {deleteState || !cmntData.being ? (
              <CommentText>
                <CommentStrongName>{cmntData.writer.nickname}</CommentStrongName>
                {'삭제된 댓글입니다.'}
              </CommentText>
            ) : (
              <>
                <CommentText>
                  <CommentStrongName>{cmntData.writer.nickname}</CommentStrongName>
                  {itemText}
                </CommentText>
                <CommentItemEtc cmntData={cmntData} groupId={groupId} />
              </>
            )}
          </CommentItemContent>
          {deleteState || !cmntData.being ? null : (
            <CommentDropdownBtn ref={btnRef} onClick={handleDropdownShow}>
              {isDropdownVisible && (
                <CommentDropdown
                  ref={dropdownRef}
                  writer={cmntData.writer.nickname}
                  handleClickShow={handleClickShow}
                  commentId={cmntData._id}
                  parentId={cmntData.parent_id}
                />
              )}
            </CommentDropdownBtn>
          )}
        </CommentItemInner>
      )}
    </>
  );
}

const CommentItemInner = styled.div`
  margin-bottom: 15px;
  display: flex;
  position: relative;
  //   margin-left: ${(props) => (props.extend === 'reply' ? '49px' : '0')};
`;

const ProfileImg = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid #091d3e;
  margin-right: 11px;
`;

const CommentDropdownBtn = styled(DropdownBtn)``;

const CommentItemContent = styled.div`
  width: 709px;
`;

const CommentText = styled.span`
  display: block;
  margin: 0;
  margin-bottom: 12px;
  line-height: 23px;
`;

const CommentStrongName = styled.strong`
  font-weight: 600;
`;
