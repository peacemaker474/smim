import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import heartFill from '../../asset/icon/icon-heart-fill.svg';
import { postLike } from '../../network/post/http';
import { getCookie } from '../../utils/cookie';

export default function PostLike({ like }) {
  console.log(like);
  const [likeVal, setLikeVal] = useState(like);
  const location = useLocation();
  const tkn = getCookie('users');
  const id = location.pathname.split('view/')[1];

  console.log(likeVal);

  const handleLikeClick = async () => {
    try {
      const response = await postLike(id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        },
      });
      console.log(response);
      setLikeVal(likeVal + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return <PostLikeSpan onClick={handleLikeClick}>{likeVal}</PostLikeSpan>;
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
    background: url(${heartFill});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: 7px;
  }
`;
