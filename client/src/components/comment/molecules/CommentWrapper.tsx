import styled from 'styled-components';
import { useAppSelectorTyped } from '../../../redux/hooks';
import useVisible from '../../../hooks/useVisible';
import { CommentData } from '../../../type/cmntTypes';
import Modal from '../../common/molecules/Modal';
import CmntItem from './CmntItem';
import useCmntModal from '../../../hooks/useCmntModal';

interface CommentWrapperProps {
  cmntData: Array<CommentData> | null;
}

export default function CommentWrapper({ cmntData }: CommentWrapperProps) {
  const [isTargetVisible, handleTargetShow] = useVisible(false);
  const [cancelFunc, actionFunc, modalText] = useCmntModal();
  const {
    commentArray: createdComments,
    commentToggled,
    deletedIdArray,
  } = useAppSelectorTyped((state) => ({
    commentArray: state.commentCreate.commentArray,
    commentToggled: state.toggle.commentToggled,
    deletedIdArray: state.comment.deletedIdArray,
  }));
  const parentData = cmntData?.find((el: CommentData) => el.parentId === null);
  const delComment = deletedIdArray.includes(parentData?._id || '');
  const childrenData = cmntData?.slice(1);
  const uploadingReplies = createdComments.filter((el) => el.groupId === parentData?._id);

  return (
    <>
      {commentToggled && (
        <Modal actionFunc={actionFunc} cancelFunc={cancelFunc}>
          {modalText}
        </Modal>
      )}
      {!delComment && parentData && (
        <CommentInner>
          <CmntItem key={parentData._id} cmntData={parentData} groupId={parentData._id} />
          <ReplyContainer>
            {Boolean(childrenData?.length) && (
              <>
                <ReplyShowingBtn onClick={handleTargetShow}>
                  ----- 답글 {isTargetVisible ? '닫기' : '보기'}
                </ReplyShowingBtn>
                {isTargetVisible && (
                  <ReplyListBox>
                    {childrenData?.map((el) => (
                      <CmntItem key={el._id} cmntData={el} groupId={parentData._id} />
                    ))}
                  </ReplyListBox>
                )}
              </>
            )}
            {Boolean(uploadingReplies?.length) && (
              <ReplyUploadListBox>
                {uploadingReplies.map((el) => (
                  <CmntItem key={el._id} cmntData={el} groupId={parentData._id} />
                ))}
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
