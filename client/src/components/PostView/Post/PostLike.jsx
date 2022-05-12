import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import heartFill from '../../../asset/icon/icon-heart-fill.svg';
import heartLine from '../../../asset/icon/icon-heart-line.svg';
import { postLike, postUnlike } from '../../../network/post/http';
import { getCookie } from '../../../utils/cookie';

export default function PostLike({ like }) {
  const [likeCheck, setLikeCheck] = useState(true);
  const location = useLocation();
  const tkn = getCookie('users');
  const id = location.pathname.split('view/')[1];
  const [likeValue, setLikeValue] = useState(like);
  const loginState = useSelector((state) => state.loginReducer);

  console.log(loginState);

  useEffect(() => {
    setLikeValue(like);
  }, [like]);

  const handleLikeClick = async () => {
    if (likeCheck) {
      // 좋아요 했을 때
      try {
        const response = await postUnlike(id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        });
        console.log(response.data.success);
        // setLikeCheck(false);
        // setLikeValue((prev) => prev - 1);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      // 좋아요 하지 않았을 때

      try {
        const response = await postLike(id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        });
        setLikeCheck(true);
        setLikeValue((prev) => prev + 1);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <PostLikeSpan onClick={handleLikeClick} check={likeCheck}>
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
    background: ${(props) => (props.check ? `url(${heartFill})` : `url(${heartLine})`)};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: 7px;
  }
`;
