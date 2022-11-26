import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useVisible } from '../../../hooks';
import { useAppSelector } from '../../../redux/hooks';
// import CmntForm from './CmntForm';
import UserImage from '../../common/atoms/UserImage';
import { CommentData } from '../../../type/cmntTypes';
// import CommentItemInner from '../CommentItemInner/CommentItemInner';
import CmntItemEtc from './CmntItemEtc';

interface Writer {
  nickname: string;
  imageUrl: string;
}

interface CmntItemProps {
  key: string | undefined;
  cmntData: CommentData | undefined;
  groupId: string | null | undefined;
}

export default function CommentItem({ key, cmntData, groupId }: CmntItemProps) {
  // const [itemText, setItemText] = useState(cmntData.text);
  // const [isTargetVisible, handleClickShow] = useVisible(false);
  // const delComment = useAppSelector((state) => state.comment).deletedIdArray.find((el) => el === cmntData._id);

  return (
    <CommentItemContainer>
      <CommentItemInner>
        {/* <UserImage width="42px" height="42px" imgUrl={cmntData?.writer.imageUrl} /> */}
        <CommentItemContent>
          <CommentContentBox>
            <CommentText>
              <CommentStrongName>{cmntData?.writer.nickname}</CommentStrongName>
              <CommentTextPara>{cmntData?.text}</CommentTextPara>
            </CommentText>
            <CmntItemEtc cmntData={cmntData} groupId={groupId} writer={cmntData?.writer.nickname} />
          </CommentContentBox>
        </CommentItemContent>
        {/* <PostDropdownBtnDiv ref={btnRef} onClick={onDropdownBtnClick}>
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
        </PostDropdownBtnDiv> */}
      </CommentItemInner>
    </CommentItemContainer>
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

// const PostDropdownBtnDiv = styled.div`
//   position: relative;
// `;

// const CommentDropdownBtn = styled(DropdownBtn)`
//   background: url(${moreIcon});
//   ${CommentItemInner}:hover > ${PostDropdownBtnDiv} > & {
//     background: url(${moreIcon});
//     background-repeat: no-repeat;
//   }
//   &:hover,
//   &:focus {
//     background: url(${moreIcon});
//     background-repeat: no-repeat;
//   }
//   // background: none;
// `;
