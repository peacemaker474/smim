import styled from 'styled-components';
import { useAppDispatch, useAppSelectorTyped, useAppSelector } from '../../../redux/hooks';
import useVisible from '../../../hooks/useVisible';
import { getCommentUnpinned, deleteComment, getCommentPinned } from '../../../networks/comment/http';
import { commentModalToggle } from '../../../redux/slice/toggleSlice';
import { initPinnedComment, deleteCommentId } from '../../../redux/slice/commentSlice';
import { getPinnedCommentData } from '../../../redux/services/comment';
import { CommentData } from '../../../type/cmntTypes';
import Modal from '../../common/molecules/Modal';
import CmntItem from './CmntItem';

interface CommentWrapperProps {
  cmntData: Array<CommentData> | null;
}

export default function CommentWrapper({ cmntData }: CommentWrapperProps) {
  const [isTargetVisible, handleTargetShow] = useVisible(false);
  const {
    commentArray: createdComments,
    commentId,
    check,
    pinnedId,
    commentToggled,
    deletedIdArray,
  } = useAppSelectorTyped((state) => ({
    commentArray: state.commentCreate.commentArray,
    commentId: state.comment.commentId,
    pinnedId: state.comment.pinnedId,
    check: state.comment.check,
    commentToggled: state.toggle.commentToggled,
    deletedIdArray: state.comment.deletedIdArray,
  }));
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const parentData = cmntData?.find((el: CommentData) => el.parent_id === null);
  const delComment = deletedIdArray.includes(parentData?._id || '');
  const childrenData = cmntData?.slice(1);
  const uploadingReplies = createdComments.filter((el) => el.group_id === parentData?._id);

  const handleCommentDelete = async () => {
    if (commentId === pinnedId) {
      await getCommentUnpinned(commentId, accessToken);
      dispatch(initPinnedComment());
    }
    await deleteComment(commentId, accessToken);
    dispatch(deleteCommentId(commentId));
    dispatch(commentModalToggle());
  };

  const handleCommentPinned = async () => {
    await getCommentPinned(commentId, accessToken);
    dispatch(getPinnedCommentData(commentId));
    dispatch(commentModalToggle());
  };

  const handleCommentUnpinned = async () => {
    await getCommentUnpinned(commentId, accessToken);
    dispatch(initPinnedComment());
    dispatch(commentModalToggle());
  };

  const cancelFunc = () => {
    dispatch(commentModalToggle());
  };

  let modalText = '';

  if (check === 'delete') {
    modalText = '댓글을 완전히 삭제하시겠습니까?';
  } else if (check === 'pinned') {
    modalText = '이 댓글을 고정하시겠습니까?\n이미 고정한 댓글이 있으면\n이 댓글로 바뀝니다.';
  } else {
    modalText = '고정 댓글을 해제하시겠습니까? ';
  }

  const actionFunc = () => {
    if (check === 'delete') {
      handleCommentDelete();
    } else if (check === 'pinned') {
      handleCommentPinned();
    } else {
      handleCommentUnpinned();
    }
  };

  return (
    <>
      {commentToggled && (
        <Modal actionFunc={actionFunc} cancelFunc={cancelFunc}>
          {modalText}
        </Modal>
      )}
      {!delComment && (
        <CommentInner>
          {parentData && <CmntItem key={parentData._id} cmntData={parentData} groupId={parentData._id} />}
          <ReplyContainer>
            {Boolean(childrenData?.length) && (
              <>
                {Boolean(childrenData?.length) && (
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
              </>
            )}
            {Boolean(uploadingReplies?.length) && (
              <ReplyUploadListBox>
                {uploadingReplies &&
                  uploadingReplies.map((el) => <CmntItem key={el._id} cmntData={el} groupId={parentData?._id} />)}
              </ReplyUploadListBox>
            )}
          </ReplyContainer>
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
