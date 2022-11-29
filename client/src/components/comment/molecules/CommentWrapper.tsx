import styled from 'styled-components';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import useVisible from '../../../hooks/useVisible';
import { getCommentUnpinned, deleteComment, getCommentPinned } from '../../../networks/comment/http';
import { commentModalToggle } from '../../../redux/slice/toggleSlice';
import { unpinnedCommentId, deleteCommentId } from '../../../redux/slice/commentSlice';
import { getPinnedCommentData } from '../../../redux/services/comment';
import { CommentData } from '../../../type/cmntTypes';
import Modal from '../../common/molecules/Modal';
import CmntItem from '../atoms/CmntItem';

interface CommentWrapperProps {
  cmntData: Array<CommentData> | null;
}

export default function CommentWrapper({ cmntData }: CommentWrapperProps) {
  const [isTargetVisible, handleTargetShow] = useVisible(false);
  const { commentToggled } = useAppSelector((state) => state.toggle);
  const createdComments = useAppSelector((state) => state.commentCreate);
  const { commentId, check, pinnedId } = useAppSelector(
    (state) => ({
      commentId: state.comment.commentId,
      pinnedId: state.comment.pinnedId,
      check: state.comment.check,
    }),
    shallowEqual,
  );
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const parentData = cmntData?.find((el: CommentData) => el.parent_id === null);
  const delComment = useAppSelector((state) => state.comment).deletedIdArray.includes(parentData?._id || '');
  const childrenData = cmntData?.slice(1);
  const uploadingReplies = createdComments.filter((el) => el.group_id === parentData?._id);

  const handleCommentDelete = async () => {
    if (commentId === pinnedId) {
      await getCommentUnpinned(commentId, accessToken);
      dispatch(unpinnedCommentId());
    }
    await deleteComment(commentId, accessToken);
    dispatch(deleteCommentId(commentId));
    dispatch(commentModalToggle());
  };

  const handleCommentPinned = async () => {
    await getCommentPinned(commentId, accessToken);
    dispatch(getPinnedCommentData({ pinnedId: commentId }));
    dispatch(commentModalToggle());
  };

  const handleCommentUnpinned = async () => {
    await getCommentUnpinned(commentId, accessToken);
    dispatch(unpinnedCommentId());
    dispatch(commentModalToggle());
  };

  const cancelFunc = () => {
    dispatch(commentModalToggle());
  };

  let modalText = '';
  let actionFunc;

  if (check === 'delete') {
    modalText = '댓글을 완전히 삭제하시겠습니까?';
    actionFunc = handleCommentDelete;
  } else if (check === 'pinned') {
    modalText = '이 댓글을 고정하시겠습니까?\n이미 고정한 댓글이 있으면\n이 댓글로 바뀝니다.';
    actionFunc = handleCommentPinned;
  } else {
    modalText = '고정 댓글을 해제하시겠습니까? ';
    actionFunc = handleCommentUnpinned;
  }
  return (
    <>
      {commentToggled && (
        <Modal actionFunc={actionFunc} cancelFunc={cancelFunc}>
          {modalText}
        </Modal>
      )}
      {delComment ? null : (
        <CommentInner>
          {parentData && <CmntItem key={parentData._id} cmntData={parentData} groupId={parentData._id} />}
          {(childrenData?.length !== 0 || (uploadingReplies && uploadingReplies.length !== 0)) && (
            <ReplyContainer>
              {childrenData?.length === 0 ? null : (
                <ReplyShowingBtn onClick={handleTargetShow}>
                  ----- 답글 {isTargetVisible ? '닫기' : '보기'}
                </ReplyShowingBtn>
              )}
              {isTargetVisible && (
                <ReplyListBox>
                  {childrenData?.map((el) => (
                    <CmntItem key={el._id} cmntData={el} groupId={parentData?._id} />
                  ))}
                </ReplyListBox>
              )}
              <ReplyUploadListBox>
                {uploadingReplies &&
                  uploadingReplies.length !== 0 &&
                  uploadingReplies.map((el) => <CmntItem key={el._id} cmntData={el} groupId={parentData?._id} />)}
              </ReplyUploadListBox>
            </ReplyContainer>
          )}
        </CommentInner>
      )}
    </>
  );
}

const CommentInner = styled.div``;

const ReplyContainer = styled.div`
  margin-left: 65px;
  margin-bottom: 20px;
`;

const ReplyListBox = styled.div`
  margin-top: 15px;
`;

const ReplyUploadListBox = styled.div`
  margin-top: 15px;
`;

const ReplyShowingBtn = styled.button`
  margin-left: 10px;
`;
