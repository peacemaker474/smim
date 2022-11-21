import styled from 'styled-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getPostLike, getPostUnlike, getBookmark, getUnbookmark } from '../../../networks/post/http';
import { loginToggle } from '../../../redux/slice/toggleSlice';

interface EtcSpanProps {
  // clickHandler: () => void;
  clickState: boolean;
  value: number;
  type: string;
}
type ObjType = {
  [index: string]: Array<string>;
};

function EtcSpan({ type, clickState, value }: EtcSpanProps) {
  const [isLikeChecked, setIsLikeChecked] = useState(clickState);
  const [likeValue, setLikeValue] = useState(value);
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const etcType: ObjType = {
    like: [
      'http://localhost:3000/asset/icons/icon-heart-fill.svg',
      'http://localhost:3000/asset/icons/icon-heart-line.svg',
    ],
    bookmark: [
      'http://localhost:3000/asset/icons/icon-bookmark-fill.svg',
      'http://localhost:3000/asset/icons/icon-bookmark-line.svg',
    ],
  };

  const clickHandler = async () => {
    if (!accessToken) {
      dispatch(loginToggle());
      return;
    }

    try {
      if (isLikeChecked && type === 'like') {
        await getPostUnlike(id, accessToken);
        setIsLikeChecked(false);
        setLikeValue((prev) => prev - 1);
      } else if (type === 'like') {
        await getPostLike(id, accessToken);
        setIsLikeChecked(true);
        setLikeValue((prev) => prev + 1);
      } else if (isLikeChecked && type === 'bookmark') {
        await getUnbookmark(id, accessToken);
        setIsLikeChecked(false);
      } else {
        await getBookmark(id, accessToken);
        setIsLikeChecked(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostLikeSpan onClick={clickHandler} checked={isLikeChecked} etcType={etcType[type]}>
      {likeValue === -1 ? '' : likeValue}
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
