import React from 'react';
import styled from 'styled-components';
import { CommentDropdown } from '../CommentDropdown/CommentDropdown';
import { DropdownBtn } from '../../../../styles/common/dropdown';
import CommentItemText from '../CommentItemText/CommentItemText';
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
}) {
  return (
    <>
      {isTargetVisible ? (
        <CommentInput handleCommentCancel={() => handleClickShow(false)} />
      ) : (
        <CommentItemInner>
          <ProfileImg />
          <CommentItemContent>
            <CommentItemText cmntData={cmntData} isTargetVisible={isTargetVisible} />
            <CommentItemEtc cmntData={cmntData} groupId={groupId} />
          </CommentItemContent>
          <CommentDropdownBtn ref={btnRef} onClick={handleDropdownShow}>
            {isDropdownVisible && (
              <CommentDropdown
                ref={dropdownRef}
                writer={cmntData.writer.nickname}
                handleClickShow={handleClickShow}
              />
            )}
          </CommentDropdownBtn>
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
