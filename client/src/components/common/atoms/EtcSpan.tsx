import styled from 'styled-components';
// import heartFill from '../../../../asset/icon/icon-heart-fill.svg';
// import heartLine from '../../../../asset/icon/icon-heart-line.svg';
// import bookrmarkFill from '../../../../asset/icon/icon-bookrmark-fill.svg';
// import bookrmarkLine from '../../../../asset/icon/icon-bookrmark-line.svg';

interface EtcSpanProps {
  clickHandler: () => void;
  clickState: boolean;
  value: number;
  type: string;
}
type ObjType = {
  [index: string]: Array<string>;
};

function EtcSpan({ type, clickHandler, clickState, value }: EtcSpanProps) {
  const etcType: ObjType = {
    like: ['../../../../asset/icon/icon-heart-fill.svg', '../../../../asset/icon/icon-heart-line.svg'],
    bookmark: ['bookmarkFill', 'bookmarkLine'],
  };
  return (
    <PostLikeSpan onClick={clickHandler} checked={clickState} etcType={etcType[type]}>
      {value}
    </PostLikeSpan>
  );
}

export default EtcSpan;

const PostLikeSpan = styled.span<{ checked: boolean; etcType: Array<string> }>`
  display: flex;
  margin-right: 12px;
  cursor: pointer;
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    display: block;
    background: ${(props) => (props.checked ? `url(${props.etcType[0]})` : `url(${props.etcType[1]})`)};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: 7px;
  }
`;
