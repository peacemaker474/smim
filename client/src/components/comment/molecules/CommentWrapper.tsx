import styled from 'styled-components';
// import useVisible from '../../../hooks/useVisible';
// import { useSelector } from 'react-redux';
import { CommentData } from '../../../type/cmntTypes';
import CmntItem from '../atoms/CmntItem';

interface CommentWrapperProps {
  cmntData: Array<CommentData>;
}

export default function CommentWrapper({ cmntData }: CommentWrapperProps) {
  //   const [isTargetVisible, handleTargetShow] = useVisible(false);
  //   const { commentArray: createdComments } = useSelector((state) => state.commentCreate);

  const parentData = cmntData.find((el: CommentData) => el.parent_id === null);

  //   const delComment = useSelector((state) => state.comment).deletedIdArray.find((el) => el === parentData._id);

  //   const childrenData = cmntData.slice(1);

  //   const uploadingReplies = createdComments.filter((el) => el.group_id === parentData._id);

  return (
    <CommentInner>
      <CmntItem key={parentData?._id} cmntData={parentData} groupId={parentData?._id} />
      {/* {(childrenData.length !== 0 || (uploadingReplies && uploadingReplies.length !== 0)) && (
            <ReplyContainer>
              {childrenData.length === 0 ? null : (
                <ReplyShowingBtn onClick={onTargetShow}>----- 답글 {isTargetVisible ? '닫기' : '보기'}</ReplyShowingBtn>
              )}

              {isTargetVisible && (
                <ReplyListBox>
                  {childrenData.map((el) => (
                    <CommentItem key={el._id} cmntData={el} groupId={parentData._id} />
                  ))}
                </ReplyListBox>
              )}
              <ReplyUploadListBox>
                {uploadingReplies &&
                  uploadingReplies.length !== 0 &&
                  uploadingReplies.map((el) => <CommentItem key={el._id} cmntData={el} groupId={parentData._id} />)}
              </ReplyUploadListBox>
            </ReplyContainer>
          )} */}
    </CommentInner>
  );
}

const CommentInner = styled.div``;

// const ReplyContainer = styled.div`
//   margin-left: 65px;
//   margin-bottom: 20px;
// `;

// const ReplyListBox = styled.div`
//   margin-top: 15px;
// `;

// const ReplyUploadListBox = styled.div`
//   margin-top: 15px;
// `;

// const ReplyShowingBtn = styled.button`
//   margin-left: 10px;
// `;
