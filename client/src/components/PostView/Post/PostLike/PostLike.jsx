import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostLike, getPostUnlike } from '../../../../network/post/http';
import PostLikePresenter from './PostLike.style';
import { isLoginCheckToggle } from '../../../../redux/slice/toggleSlice';

export default function PostLike({ quantity, like }) {
  const [isLikeChecked, setIsLikeChecked] = useState(like);
  const { accessToken } = useSelector((state) => state.authToken);
  const { id } = useParams();
  const [likeValue, setLikeValue] = useState(quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    setLikeValue(quantity);
    setIsLikeChecked(like);
  }, [quantity, like]);

  const handleLikeClick = async () => {
    if (!accessToken) {
      return dispatch(isLoginCheckToggle());
    }

    if (isLikeChecked) {
      // 좋아요 했을 때
      try {
        await getPostUnlike(id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
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
            Authorization: `Bearer ${accessToken}`,
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
      onLikeClick={handleLikeClick}
      isLikeChecked={isLikeChecked}
      likeValue={likeValue}
    />
  );
}
