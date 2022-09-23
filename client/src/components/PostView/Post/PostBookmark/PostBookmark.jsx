import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBookmark, getUnbookmark } from '../../../../network/post/http';
import { isLoginCheckToggle } from '../../../../redux/slice/toggleSlice';
import PostBookmarkPresenter from './PostBookmark.style';

export default function PostBookmark({ bookmark }) {
  const { accessToken } = useSelector((state) => state.authToken);
  const [isBookmarkChecked, setIsBookmarkChecked] = useState(bookmark);
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location.pathname.split('view/')[1];

  useEffect(() => {
    setIsBookmarkChecked(bookmark);
  }, [bookmark]);

  const handleBookmarkClick = async () => {
    if (!accessToken) {
      dispatch(isLoginCheckToggle());
      return;
    }

    if (isBookmarkChecked) {
      // 북마크 했을 때
      try {
        await getUnbookmark(id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setIsBookmarkChecked(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      // 북마크 하지 않았을 때

      try {
        await getBookmark(id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setIsBookmarkChecked(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <PostBookmarkPresenter
      onBookmarkClick={handleBookmarkClick}
      isBookmarkChecked={isBookmarkChecked}
    />
  );
}
