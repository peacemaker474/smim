import styled from 'styled-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getPostLike, getPostUnlike } from '../../../networks/post/http';
import { loginToggle } from '../../../redux/slice/toggleSlice';
import PostLike from '../../../asset/icons/icon-heart-fill.svg';
import PostUnlike from '../../../asset/icons/icon-heart-line.svg';

interface LikeProps {
  clickState: boolean;
  value: number;
}

function Like({ clickState, value }: LikeProps) {
  const [isLikeChecked, setIsLikeChecked] = useState(clickState);
  const [likeValue, setLikeValue] = useState(value);
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const clickHandler = async () => {
    if (!accessToken) {
      dispatch(loginToggle());
      return;
    }

    try {
      if (isLikeChecked) {
        await getPostUnlike(id, accessToken);
        setIsLikeChecked(false);
        setLikeValue((prev) => prev - 1);
      } else {
        await getPostLike(id, accessToken);
        setIsLikeChecked(true);
        setLikeValue((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostLikeSpan onClick={clickHandler} checked={isLikeChecked}>
      {likeValue}
    </PostLikeSpan>
  );
}

export default Like;

const PostLikeSpan = styled.span<{ checked: boolean }>`
  display: flex;
  margin-right: 12px;
  cursor: pointer;
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    display: block;
    background: ${(props) => (props.checked ? `url(${PostLike})` : `url(${PostUnlike})`)};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: 7px;
  }
`;
