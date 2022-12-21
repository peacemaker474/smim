import styled from 'styled-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getBookmark, getUnbookmark } from '../../../networks/post/http';
import { loginToggle } from '../../../redux/slice/toggleSlice';
import PostBookmark from '../../../asset/icons/icon-bookmark-fill.svg';
import PostUnBookmark from '../../../asset/icons/icon-bookmark-line.svg';

interface BookmarkProps {
  clickState: boolean;
}

type Params = {
  id: string;
};

function Bookmark({ clickState }: BookmarkProps) {
  const [isBookmarkChecked, setIsBookmarkChecked] = useState(clickState);
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { id } = useParams<keyof Params>() as Params;

  const clickHandler = async () => {
    if (!accessToken) {
      dispatch(loginToggle());
      return;
    }

    try {
      if (isBookmarkChecked) {
        await getUnbookmark(id, accessToken);
        setIsBookmarkChecked(false);
      } else {
        await getBookmark(id, accessToken);
        setIsBookmarkChecked(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <PostBookmarkSpan onClick={clickHandler} checked={isBookmarkChecked} />;
}

export default Bookmark;

const PostBookmarkSpan = styled.span<{ checked: boolean }>`
  display: flex;
  margin-right: 12px;
  cursor: pointer;
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    display: block;
    background: ${(props) => (props.checked ? `url(${PostBookmark})` : `url(${PostUnBookmark})`)};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: 7px;
  }
`;
