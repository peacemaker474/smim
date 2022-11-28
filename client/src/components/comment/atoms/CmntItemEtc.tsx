import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import { isLoginCheckToggle } from '../../../../redux/slice/toggleSlice';
import useVisible from '../../../hooks/useVisible';
import { elapsedText } from '../../../utils/elapsedText';
import CmntForm from './CmntForm';
import Like from '../../common/atoms/Like';
import { CommentData } from '../../../type/cmntTypes';
import { getCommentLike, getCommentUnlike } from '../../../networks/comment/http';

interface CommentItemEtc {
  cmntData: CommentData | undefined;
  groupId: string | null | undefined;
  writer: string | undefined;
}

function CommentItemEtc({ cmntData, groupId, writer }: CommentItemEtc) {
  const { accessToken } = useAppSelector((state) => state.auth);
  const [isTargetVisible, handleTargetShow] = useVisible(false);
  const dispatch = useAppDispatch();

  const handleReplyClickShow = () => {
    if (accessToken) {
      handleTargetShow();
    } else {
      //   dispatch(isLoginCheckToggle());
    }
  };

  const createAt = elapsedText(cmntData?.createAt);

  return (
    <CommentEtcContainer>
      <CommentEtc>
        <CommentDate>{createAt}</CommentDate>
        <CommentReBtn onClick={handleReplyClickShow}>답글 달기</CommentReBtn>
        <Like
          getLike={getCommentLike}
          getUnlike={getCommentUnlike}
          clickState
          // clickState user와 비교하기
          value={cmntData?.like_count}
        />
      </CommentEtc>
      {isTargetVisible && (
        <CmntForm
          groupId={groupId}
          postId={cmntData?.post_id}
          parentId={cmntData?._id}
          //   writer={writer}
          //   onFormInputCancel={handleTargetShow}
          isTargetVisible={isTargetVisible}
        />
      )}
    </CommentEtcContainer>
  );
}

export default CommentItemEtc;

const CommentEtcContainer = styled.div``;

const CommentEtc = styled.div`
  display: flex;
  align-items: center;
`;

const CommentDate = styled.span`
  margin-right: 5px;
  font-size: 14px;
  @media (max-width: 612px) {
    font-size: 13px;
    margin-right: 0;
  }
`;

const CommentReBtn = styled.button`
  margin-right: 5px;
  font-size: 14px;
  font-weight: 600;
  @media (max-width: 612px) {
    font-size: 13px;
    margin-right: 0;
  }
`;
