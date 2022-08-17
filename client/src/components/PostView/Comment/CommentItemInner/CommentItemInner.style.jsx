import React from 'react';
import styled from 'styled-components';
import CommentItemEtc from '../CommentItemEtc/CommentItemEtc';
import UserImage from '../../../common/UserImage/UserImage';
import { CommentDropdown } from '../CommentDropdown/CommentDropdown';
import moreIcon from '../../../../asset/icon/icon-more-vertical.svg';
import { DropdownBtn } from '../../../../styles/common/dropdown';

export default function CommentItemInnerPresenter({
  groupId,
  isDropdownVisible,
  dropdownRef,
  btnRef,
  onDropdownBtnClick,
  cmntData,
  onClickShow,
  changedText,
}) {
  return (
    <>
      <CommentItemInner>
        <UserImage width={'45px'} height={'45px'} imgUrl={cmntData.writer.imageUrl} />
        <CommentItemContent>
          <CommentContentBox groupId={groupId} cmntId={cmntData._id}>
            <CommentText groupId={groupId} cmntId={cmntData._id}>
              <CommentStrongName>{cmntData.writer.nickname}</CommentStrongName>
              <CommentTextPara>{changedText}</CommentTextPara>
            </CommentText>
            <CommentItemEtc
              cmntData={cmntData}
              groupId={groupId}
              writer={cmntData.writer.nickname}
            />
          </CommentContentBox>
        </CommentItemContent>
        <PostDropdownBtnDiv ref={btnRef} onClick={onDropdownBtnClick}>
          <CommentDropdownBtn />
          {isDropdownVisible && (
            <CommentDropdown
              ref={dropdownRef}
              writer={cmntData.writer.nickname}
              onClickShow={onClickShow}
              commentId={cmntData._id}
              parentId={cmntData.parent_id}
              isDropdownVisible={isDropdownVisible}
            />
          )}
        </PostDropdownBtnDiv>
      </CommentItemInner>
    </>
  );
}

export const CommentItemInner = styled.div`
  position: relative;
  display: flex;
`;

const CommentItemContent = styled.div`
  margin-left: 20px;
  display: flex;
`;

const CommentContentBox = styled.div`
  @media (max-width: 612px) {
    width: ${({ groupId, cmntId }) => (groupId === cmntId ? '239px' : '174px')};
  }
  @media (min-width: 612px) and (max-width: 768px) {
    width: ${({ groupId, cmntId }) => (groupId === cmntId ? '420px' : '354px')};
  }
  @media (min-width: 768px) and (max-width: 992px) {
    width: ${({ groupId, cmntId }) => (groupId === cmntId ? '551px' : '486px')};
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    width: ${({ groupId, cmntId }) => (groupId === cmntId ? '681px' : '617px')};
  }

  @media (min-width: 1200px) {
    width: ${({ groupId, cmntId }) => (groupId === cmntId ? '811px' : '746px')};
  }
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

const CommentTextPara = styled.p`
  word-break: break-word;
  white-space: pre-line;
`;

const PostDropdownBtnDiv = styled.div`
  position: relative;
`;

const CommentDropdownBtn = styled(DropdownBtn)`
  background: url(${moreIcon});
  ${CommentItemInner}:hover > ${PostDropdownBtnDiv} > & {
    background: url(${moreIcon});
    background-repeat: no-repeat;
  }
  &:hover,
  &:focus {
    background: url(${moreIcon});
    background-repeat: no-repeat;
  }
  // background: none;
`;
