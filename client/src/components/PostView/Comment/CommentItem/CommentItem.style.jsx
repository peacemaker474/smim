import React from 'react';
import styled from 'styled-components';
import CommentItemEtc from '../CommentItemEtc/CommentItemEtc';
import CommentInput from '../CommentInput/CommentInput';
import CommentDropdownBtn from '../CommentDropdownBtn/CommentDropdownBtn';
import UserImage from '../../../common/UserImage/UserImage';

export default function CommentItemPresenter({
  cmntData,
  groupId,
  isTargetVisible,
  handleClickCancel,
  handleTextChange,
  itemText,
  deleteState,
  handleClickShow,
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
          id={cmntData._id}
          handleTextChange={handleTextChange}
        />
      ) : (
        <CommentItemInner>
          <UserImage width={'38px'} height={'38px'} img={cmntData.writer.imageUrl} />
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
            <CommentDropdownBtn cmntData={cmntData} handleClickShow={handleClickShow} />
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
