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
  handleDropdownShow,
  cmntData,
  handleClickShow,
  itemText,
}) {
  return (
    <>
      <CommentItemInner>
        <UserImage width={'45px'} height={'45px'} imgUrl={cmntData.writer.imageUrl} />
        <CommentItemContent>
          <CommentContentBox>
            <CommentText groupId={groupId} cmntId={cmntData._id}>
              <CommentStrongName>{cmntData.writer.nickname}</CommentStrongName>
              {itemText}
            </CommentText>
            <CommentItemEtc cmntData={cmntData} groupId={groupId} />
          </CommentContentBox>
        </CommentItemContent>
      </CommentItemInner>
      <PostDropdownBtnDiv
        ref={btnRef}
        onClick={(e) => {
          handleDropdownShow();
          e.target.focus();
        }}
      >
        <CommentDropdownBtn />
        {isDropdownVisible && (
          <CommentDropdown
            ref={dropdownRef}
            writer={cmntData.writer.nickname}
            handleClickShow={handleClickShow}
            commentId={cmntData._id}
            parentId={cmntData.parent_id}
            isDropdownVisible={isDropdownVisible}
          />
        )}
      </PostDropdownBtnDiv>
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

const CommentContentBox = styled.div``;

const CommentText = styled.span`
  display: block;
  margin: 0;
  margin-bottom: 4px;
  line-height: 23px;
  width: ${({ groupId, cmntId }) => (groupId === cmntId ? '710px' : '645px')};
`;

const CommentStrongName = styled.strong`
  font-weight: 600;
  margin-right: 7px;
`;

const PostDropdownBtnDiv = styled.div`
  position: relative;
  ${CommentItemInner}:hover + & {
    background: url(${moreIcon});
    background-repeat: no-repeat;
  }
  &:hover,
  &:focus {
    background: url(${moreIcon});
    background-repeat: no-repeat;
  }
  background: none;
`;

const CommentDropdownBtn = styled(DropdownBtn)``;
