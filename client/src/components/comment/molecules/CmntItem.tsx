import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useVisible, useDropdown } from '../../../hooks';
import { useAppSelector } from '../../../redux/hooks';
import CmntForm from '../atoms/CmntForm';
import UserImage from '../../common/atoms/UserImage';
import { CommentData } from '../../../type/cmntTypes';
import CmntItemEtc from '../atoms/CmntItemEtc';
import CmntDropdown from '../atoms/CmntDropdown';
import moreIcon from '../../../asset/icons/icon-more-vertical.svg';

interface CmntItemProps {
  cmntData: CommentData;
  groupId: string | null | undefined;
}

export default function CmntItem({ cmntData, groupId }: CmntItemProps) {
  const [itemText, setItemText] = useState(cmntData.text);
  const [isTargetVisible, handleClickShow] = useVisible(false);
  const delComment = useAppSelector((state) => state.comment).deletedIdArray.includes(cmntData._id);
  const [isDropdownVisible, dropdownRef, btnRef, handleDropdownShow]: any[] = useDropdown();

  const handleFormInputCancel = useCallback(() => {
    handleClickShow();
  }, [handleClickShow]);

  const handleTextChange = (text: string) => {
    setItemText(text);
  };

  const changedText = itemText?.replaceAll('<br>', '\n');

  return (
    <div>
      {Boolean(delComment) || (
        <div>
          {isTargetVisible ? (
            <CmntForm
              postId={cmntData.post_id}
              parentId={cmntData.parent_id}
              groupId={groupId}
              isTargetVisible={isTargetVisible}
              onFormInputCancel={handleFormInputCancel}
              id={cmntData._id}
              onTextChange={handleTextChange}
              changedText={changedText}
            />
          ) : (
            <CommentItemContainer>
              <CommentItemInner>
                <UserImage width="42px" height="42px" imgUrl={cmntData.writer.imageUrl} />
                <CommentItemContent>
                  <CommentContentBox>
                    <CommentText>
                      <CommentStrongName>{cmntData.writer.nickname}</CommentStrongName>
                      <CommentTextPara>{itemText}</CommentTextPara>
                    </CommentText>
                    <CmntItemEtc cmntData={cmntData} groupId={groupId} />
                  </CommentContentBox>
                </CommentItemContent>
                <PostDropdownBtnDiv ref={btnRef} onClick={handleDropdownShow}>
                  <CommentDropdownBtn />
                  {isDropdownVisible && (
                    <CmntDropdown
                      dropdownRef={dropdownRef}
                      writer={cmntData.writer.nickname}
                      onClickShow={handleClickShow}
                      commentId={cmntData._id}
                      parentId={cmntData.parent_id}
                    />
                  )}
                </PostDropdownBtnDiv>
              </CommentItemInner>
            </CommentItemContainer>
          )}
        </div>
      )}
    </div>
  );
}

export const CommentItemContainer = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 612px) {
    font-size: 15px;
  }
`;

export const CommentItemInner = styled.div`
  position: relative;
  display: flex;
`;

const CommentItemContent = styled.div`
  margin-left: 20px;
  display: flex;
`;

const CommentContentBox = styled.div`
  width: 811px;
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

const CommentDropdownBtn = styled.div`
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-size: contain;

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
