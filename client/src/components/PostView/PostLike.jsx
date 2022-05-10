import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import heartFill from '../../asset/icon/icon-heart-fill.svg';
import heartLine from '../../asset/icon/icon-heart-line.svg';
import { postLike, postUnlike } from '../../network/post/http';
import { getCookie } from '../../utils/cookie';

export default function PostLike({ like }) {
  const [likeCheck, setLikeCheck] = useState(false);
  const location = useLocation();
  const tkn = getCookie('users');
  const id = location.pathname.split('view/')[1];

  const handleLikeClick = async () => {
    if (likeCheck) {
      try {
        const response = await postUnlike(id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        });
        setLikeCheck(false);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await postLike(id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        });
        setLikeCheck(true);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  console.log(like);

  return (
    <PostLikeSpan onClick={handleLikeClick} check={likeCheck}>
      {like}
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
    background: ${(props) => (props.check ? `url(${heartFill})` : `url(${heartLine})`)};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: 7px;
  }
`;
