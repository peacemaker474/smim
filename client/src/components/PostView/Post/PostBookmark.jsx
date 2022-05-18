import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import bookmarkFill from '../../../asset/icon/icon-bookmark-fill.svg';
import bookmarkLine from '../../../asset/icon/icon-bookmark-line.svg';
import { postBookmark, postUnbookmark } from '../../../network/post/http';
import { getCookie } from '../../../utils/cookie';

export default function PostBookmark({ bookmark }) {
  const [BookmarkCheck, setBookmarkCheck] = useState(bookmark);
  const location = useLocation();
  const tkn = getCookie('users');
  const id = location.pathname.split('view/')[1];

  useEffect(() => {
    setBookmarkCheck(bookmark);
  }, [bookmark]);

  const handleBookmarkClick = async () => {
    if (!tkn) {
      return;
    }

    if (BookmarkCheck) {
      // 북마크 했을 때
      try {
        const response = await postUnbookmark(id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        });
        console.log(response);
        setBookmarkCheck(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      // 북마크 하지 않았을 때

      try {
        const response = await postBookmark(id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        });
        console.log(response);
        setBookmarkCheck(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return <PostBookmarkSpan onClick={handleBookmarkClick} check={BookmarkCheck} />;
}

const PostBookmarkSpan = styled.span`
  display: flex;
  margin-right: 12px;
  cursor: pointer;
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    display: block;
    background: ${(props) => (props.check ? `url(${bookmarkFill})` : `url(${bookmarkLine})`)};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: 7px;
  }
`;
