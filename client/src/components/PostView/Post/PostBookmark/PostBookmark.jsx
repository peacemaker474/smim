import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getBookmark, getUnbookmark } from '../../../../network/post/http';
import PostBookmarkPresenter from './PostBookmark.style';

export default function PostBookmark({ bookmark }) {
  const [isBookmarkChecked, setIsBookmarkChecked] = useState(bookmark);
  const location = useLocation();
  const tkn = useSelector((state) => state.authToken).accessToken;
  const id = location.pathname.split('view/')[1];

  useEffect(() => {
    setIsBookmarkChecked(bookmark);
  }, [bookmark]);

  const handleBookmarkClick = async () => {
    if (!tkn) {
      return;
    }

    if (isBookmarkChecked) {
      // 북마크 했을 때
      try {
        const response = await getUnbookmark(id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        });
        console.log(response);
        setIsBookmarkChecked(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      // 북마크 하지 않았을 때

      try {
        const response = await getBookmark(id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        });
        console.log(response);
        setIsBookmarkChecked(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <PostBookmarkPresenter
      handleBookmarkClick={handleBookmarkClick}
      isBookmarkChecked={isBookmarkChecked}
    />
  );
}
