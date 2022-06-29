import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getPostLike, getPostUnlike } from '../../../../network/post/http';
import PostLikePresenter from './PostLike.style';

export default function PostLike({ quantity, like }) {
  const [isLikeChecked, setIsLikeChecked] = useState(like);
  const location = useLocation();
  const tkn = useSelector((state) => state.authToken).accessToken;
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
    <PostLikePresenter
      handleLikeClick={handleLikeClick}
      isLikeChecked={isLikeChecked}
      likeValue={likeValue}
    />
  );
}
