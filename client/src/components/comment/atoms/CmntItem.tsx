import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useVisible } from '../../../hooks';
import { useAppSelector } from '../../../redux/hooks';
import CmntForm from './CmntForm';
// import CommentItemInner from '../CommentItemInner/CommentItemInner';

interface CmntData {
  text: string;
  _id: string;
  parent_id: string;
  post_id: string;
}

interface CmntItemProps {
  cmntData: CmntData;
  groupId: string | null;
}

export default function CommentItemPresenter({ cmntData, groupId }: CmntItemProps) {
  const [itemText, setItemText] = useState(cmntData.text);
  const [isTargetVisible, handleClickShow] = useVisible(false);
  const delComment = useAppSelector((state) => state.comment).deletedIdArray.find((el) => el === cmntData._id);
  const delState = Boolean(delComment);

  const handleFormInputCancel = useCallback(
    (e: React.MouseEvent<HTMLTextAreaElement>) => {
      //   e.target.value = '';
      handleClickShow(false);
    },
    [handleClickShow],
  );

  const handleTextChange = (text: string) => {
    setItemText(text);
  };

  let changedText = itemText.replaceAll('<br>', '\n');

  return (
    // <>
    //   {isTargetVisible ? (
    <CmntForm
      postId={cmntData.post_id}
      parentId={cmntData.parent_id}
      groupId={groupId}
      //   isTargetVisible={isTargetVisible}
      //   onFormInputCancel={handleFormInputCancel}
      id={cmntData._id}
      //   onTextChange={handleTextChange}
      //   changedText={changedText}
    />
    //   ) : delState ? null : (
    //     <CommentItemContainer>
    //       <CommentItemInner
    //         changedText={changedText}
    //         onClickShow={handleClickShow}
    //         groupId={groupId}
    //         cmntData={cmntData}
    //       />
    //     </CommentItemContainer>
    //   )}
    // </>
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
