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
  handleClickShow,
  width,
  childWidth,
  inputVisible,
  setInputVisible,
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
        <CommentItemContainer>
          <CommentItemInner>
            <UserImage width={'45px'} height={'45px'} imgUrl={cmntData.writer.imageUrl} />
            <CommentItemContent width={width}>
              <CommentContentBox childWidth={childWidth}>
                <CommentText>
                  <CommentStrongName>{cmntData.writer.nickname}</CommentStrongName>
                  {itemText}
                </CommentText>
                <CommentItemEtc
                  cmntData={cmntData}
                  groupId={groupId}
                  setInputVisible={setInputVisible}
                />
              </CommentContentBox>
              <CommentDropdownBtn cmntData={cmntData} handleClickShow={handleClickShow} />
            </CommentItemContent>
          </CommentItemInner>
          {inputVisible && (
            <CommentItemInput>
              <CommentInput
                groupId={groupId}
                postId={cmntData.post_id}
                parentId={cmntData.parent_id}
                isTargetCommentInputVisible={isTargetVisible}
                handleClickCancel={() => {
                  handleClickCancel();
                  setInputVisible(false);
                }}
              />
            </CommentItemInput>
          )}
        </CommentItemContainer>
      )}
    </>
  );
}

const CommentItemContainer = styled.div`
  margin-bottom: 15px;
`;

const CommentItemInner = styled.div`
  position: relative;
  display: flex;
  //   margin-left: ${(props) => (props.extend === 'reply' ? '49px' : '0')};
`;

const CommentItemContent = styled.div`
  width: 753px;
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => `${width}` || '798px'};
`;

const CommentItemInput = styled.div``;

const CommentContentBox = styled.div`
  width: ${({ childWidth }) => `${childWidth}` || '693px'};
`;

const CommentText = styled.span`
  display: block;
  margin: 0;
  margin-bottom: 4px;
  line-height: 23px;
`;

const CommentStrongName = styled.strong`
  font-weight: 600;
  margin-right: 7px;
`;
