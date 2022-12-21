import { useState } from 'react';
import styled from 'styled-components';
import { AxiosResponse } from 'axios';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { isLoginCheckToggle } from '../../../redux/slice/toggleSlice';
import PostLike from '../../../asset/icons/icon-heart-fill.svg';
import PostUnlike from '../../../asset/icons/icon-heart-line.svg';

interface LikeProps {
  clickState: boolean;
  value: number;
  getLike: (id: string, accessToken: string | null) => Promise<AxiosResponse<any, any>>;
  getUnlike: (id: string, accessToken: string | null) => Promise<AxiosResponse<any, any>>;
  id: string;
}

function Like({ clickState, value, getLike, getUnlike, id }: LikeProps) {
  const [isLikeChecked, setIsLikeChecked] = useState(clickState);
  const [likeValue, setLikeValue] = useState(value || 0);
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const clickHandler = async () => {
    if (!accessToken) {
      dispatch(isLoginCheckToggle());
      return;
    }

    try {
      if (isLikeChecked) {
        await getUnlike(id, accessToken);
        setIsLikeChecked(false);
        setLikeValue((prev) => prev - 1);
      } else {
        await getLike(id, accessToken);
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
