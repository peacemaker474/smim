import { useState } from 'react';
import styled from 'styled-components';
import { useVisible, useDropdown } from '../../../hooks';
import { useAppSelector } from '../../../redux/hooks';
import CmntForm from '../atoms/CmntForm';
import UserImage from '../../common/atoms/UserImage';
import CmntItemEtc from '../atoms/CmntItemEtc';
import CmntDropdown from '../atoms/CmntDropdown';
import UserAge from '../../common/atoms/Age';
import { CommentData } from '../../../type/cmntTypes';
import moreIcon from '../../../asset/icons/icon-more-vertical.svg';

interface CmntItemProps {
  cmntData: CommentData;
  groupId: string;
}

export default function CmntItem({ cmntData, groupId }: CmntItemProps) {
  const [itemText, setItemText] = useState(cmntData.text);
  const [isTargetVisible, handleClickShow] = useVisible(false);
  const [isDropdownVisible, dropdownRef, btnRef, handleDropdownShow]: any[] = useDropdown();
  const delComment = useAppSelector((state) => state.comment).deletedIdArray.includes(cmntData._id);

  const handleTextChange = (text: string) => {
    setItemText(text);
  };

  const changedText = itemText?.replaceAll('<br>', '\n');

  return (
    <div>
      {!delComment && (
        <div>
          {isTargetVisible ? (
            <CmntForm
              postId={cmntData.postId}
              parentId={cmntData.parentId}
              groupId={groupId}
              isTargetVisible={isTargetVisible}
              onFormInputCancel={handleClickShow}
              id={cmntData._id}
              onTextChange={handleTextChange}
              changedText={changedText}
            />
          ) : (
            <CommentItemContainer>
              <CommentItemInner>
                <UserImage width="42px" height="42px" imgUrl={cmntData.writer.imageUrl} />
                <CommentItemContentBox>
                  <CommentContent>
                    <CommentInner>
                      <CommentUser>
                        <CommentStrongName>{cmntData.writer.nickname}</CommentStrongName>
                        <UserAge lineHeight="11px">{cmntData.writer.ageGroup}</UserAge>
                      </CommentUser>
                      <CommentTextPara>{itemText}</CommentTextPara>
                    </CommentInner>
                    <CmntItemEtc cmntData={cmntData} groupId={groupId} />
                  </CommentContent>
                </CommentItemContentBox>
                <PostDropdownBtnDiv ref={btnRef} onClick={handleDropdownShow}>
                  <CommentDropdownBtn />
                  {isDropdownVisible && (
                    <CmntDropdown
                      dropdownRef={dropdownRef}
                      writer={cmntData.writer.nickname}
                      onClickShow={handleClickShow}
                      commentId={cmntData._id}
                      parentId={cmntData.parentId}
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
  width: 100%;
  position: relative;
  display: flex;
`;

const CommentItemContentBox = styled.div`
  width: 100%;
  margin-left: 20px;
  display: flex;
`;

const CommentContent = styled.div`
  width: 100%;
`;

const CommentInner = styled.span`
  display: block;
  margin: 0;
  margin-bottom: 4px;
  line-height: 23px;
`;

const CommentUser = styled.div``;

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
`;
