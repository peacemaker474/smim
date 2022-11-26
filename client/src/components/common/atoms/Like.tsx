import { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { loginToggle } from '../../../redux/slice/toggleSlice';
import PostLike from '../../../asset/icons/icon-heart-fill.svg';
import PostUnlike from '../../../asset/icons/icon-heart-line.svg';

interface LikeProps {
  clickState: boolean;
  value: number | undefined;
  getLike: (id: string | undefined, accessToken: string | null) => Promise<AxiosResponse<any, any>>;
  getUnlike: (id: string | undefined, accessToken: string | null) => Promise<AxiosResponse<any, any>>;
}

function Like({ clickState, value, getLike, getUnlike }: LikeProps) {
  console.log(value, clickState);
  const [isLikeChecked, setIsLikeChecked] = useState(clickState);
  const [likeValue, setLikeValue] = useState(value || 0);
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
        await getLike(id, accessToken);
        setIsLikeChecked(false);
        setLikeValue((prev) => prev - 1);
      } else {
        await getUnlike(id, accessToken);
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
