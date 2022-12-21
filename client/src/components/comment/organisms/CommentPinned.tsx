import styled from 'styled-components';
import { useAppSelectorTyped } from '../../../redux/hooks';
import CommentWrapper from '../molecules/CommentWrapper';
import pinIcon from '../../../asset/icons/icon-pin.svg';

function CommentPinned() {
  const { pinnedData, pinnedId, postWriter } = useAppSelectorTyped((state) => ({
    pinnedData: state.comment.pinnedData,
    pinnedId: state.comment.pinnedId,
    postWriter: state.post.postWriter,
  }));

  return (
    <CommentPinnedDiv>
      {pinnedId && (
        <>
          <CommentPinnedSpan>
            <CommentPinnedId>{postWriter}</CommentPinnedId>님이 고정함
          </CommentPinnedSpan>
          <CommentWrapper cmntData={pinnedData} />
        </>
      )}
    </CommentPinnedDiv>
  );
}

export default CommentPinned;

const CommentPinnedDiv = styled.div``;

const CommentPinnedSpan = styled.div`
  color: #888888;
  height: 20px;
  display: flex;
  &::before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    background: url(${pinIcon});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: 10px;
  }
  margin-bottom: 12px;
`;

const CommentPinnedId = styled.strong`
  font-weight: 600;
`;
