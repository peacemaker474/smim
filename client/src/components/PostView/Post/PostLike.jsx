import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import heartFill from '../../../asset/icon/icon-heart-fill.svg';
import heartLine from '../../../asset/icon/icon-heart-line.svg';
import { getPostLike, getPostUnlike } from '../../../network/post/http';
import { getCookie } from '../../../utils/cookie';

export default function PostLike({ quantity, like }) {
  const [isLikeChecked, setIsLikeChecked] = useState(like);
  const location = useLocation();
  const tkn = getCookie('users');
  const id = location.pathname.split('view/')[1];
  const [likeValue, setLikeValue] = useState(quantity);

  useEffect(() => {
    setLikeValue(quantity);
    setIsLikeChecked(like);
  }, [quantity, like]);

  const handleLikeClick = async () => {
    if (!tkn) {
      return;
    }

    if (isLikeChecked) {
      // 좋아요 했을 때
      try {
        await getPostUnlike(id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        });

        setIsLikeChecked(false);
        setLikeValue((prev) => prev - 1);
      } catch (error) {
        console.error(error);
      }
    } else {
      // 좋아요 하지 않았을 때

      try {
        await getPostLike(id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        });
        setIsLikeChecked(true);
        setLikeValue((prev) => prev + 1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <PostLikeSpan onClick={handleLikeClick} likechecked={isLikeChecked}>
      {likeValue}
    </PostLikeSpan>
  );
}

const PostLikeSpan = styled.span`
  display: flex;
  margin-right: 12px;
  cursor: pointer;
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    display: block;
    background: ${(props) => (props.likechecked ? `url(${heartFill})` : `url(${heartLine})`)};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: 7px;
  }
`;
