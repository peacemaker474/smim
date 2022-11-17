import styled from 'styled-components';
import heartFill from '../../../../asset/icon/icon-heart-fill.svg';
import heartLine from '../../../../asset/icon/icon-heart-line.svg';

interface EtcSpanProps {
  clickHandler: () => void;
  clickState: boolean;
  value: string;
  type: string;
}

function EtcSpan({ type, clickHandler, clickState, value }: EtcSpanProps) {
  const typeCheck = type === 'bookmark' ? true : false;
  return (
    <PostLikeSpan onClick={clickHandler} likeChecked={clickState}>
      {value}
    </PostLikeSpan>
  );
}

export default EtcSpan;

const PostLikeSpan = styled.span<{ likeChecked: boolean }>`
  display: flex;
  margin-right: 12px;
  cursor: pointer;
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    display: block;
    background: ${(props) => (props.likeChecked ? `url(${heartFill})` : `url(${heartLine})`)};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: 7px;
  }
`;
