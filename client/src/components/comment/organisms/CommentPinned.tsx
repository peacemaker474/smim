import styled from 'styled-components';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../../redux/hooks';
import CommentWrapper from '../molecules/CommentWrapper';
import pinIcon from '../../../asset/icons/icon-pin.svg';

function CommentPinned() {
  const { pinnedData, pinnedId } = useAppSelector(
    (state) => ({
      pinnedData: state.comment.pinnedData,
      pinnedId: state.comment.pinnedId,
    }),
    shallowEqual,
  );

  const { postWriter } = useAppSelector((state) => state.post);

  return (
    <div>
      {pinnedId && (
        <CommentPinnedDiv>
          <CommentPinnedSpan>
            <CommentPinnedId>{postWriter}</CommentPinnedId>님이 고정함
          </CommentPinnedSpan>
          <CommentWrapper cmntData={pinnedData} />
        </CommentPinnedDiv>
      )}
    </div>
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
