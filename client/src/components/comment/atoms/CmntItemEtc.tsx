import styled from 'styled-components';
import { useAppDispatch, useAppSelectorTyped } from '../../../redux/hooks';
import { isLoginCheckToggle } from '../../../redux/slice/toggleSlice';
import useVisible from '../../../hooks/useVisible';
import { getCommentLike, getCommentUnlike } from '../../../networks/comment/http';
import { elapsedText } from '../../../utils/elapsedText';
import CmntForm from './CmntForm';
import Like from '../../common/atoms/Like';
import { CommentData } from '../../../type/cmntTypes';

interface CommentItemEtcProps {
  cmntData: CommentData;
  groupId: string;
}

function CommentItemEtc({ cmntData, groupId }: CommentItemEtcProps) {
  const { accessToken, id } = useAppSelectorTyped((state) => ({
    accessToken: state.auth.accessToken,
    id: state.user.id,
  }));
  const [isTargetVisible, handleTargetShow] = useVisible(false);
  const dispatch = useAppDispatch();

  const handleReplyClickShow = () => {
    if (accessToken) {
      handleTargetShow();
    } else {
      dispatch(isLoginCheckToggle());
    }
  };

  const createAt = elapsedText(cmntData.createAt);

  const likeState = cmntData.likeUsers.includes(id); // likeUsers에는 _id이며, user에서 가져온 id는 로그인할 때 필요한 id => 수정필요함

  return (
    <CommentEtcContainer>
      <CommentEtc>
        <CommentDate>{createAt}</CommentDate>
        <CommentReBtn onClick={handleReplyClickShow}>답글 달기</CommentReBtn>
        <Like
          getLike={getCommentLike}
          getUnlike={getCommentUnlike}
          clickState={likeState}
          value={cmntData.likeCount}
          id={cmntData._id}
        />
      </CommentEtc>
      {isTargetVisible && (
        <CmntForm
          groupId={groupId}
          postId={cmntData.postId}
          parentId={cmntData._id}
          onFormInputCancel={handleTargetShow}
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
