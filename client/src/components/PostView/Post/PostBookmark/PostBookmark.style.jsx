import React from 'react';
import styled from 'styled-components';
import bookmarkFill from '../../../../asset/icon/icon-bookmark-fill.svg';
import bookmarkLine from '../../../../asset/icon/icon-bookmark-line.svg';

export default function PostBookmarkPresenter({ isBookmarkChecked, onBookmarkClick }) {
  return (
    <BookmarkSpan 
      onClick={onBookmarkClick}
      bookmarkChecked={isBookmarkChecked} 
    />
  );
}

const BookmarkSpan = styled.span`
  display: flex;
  margin-right: 12px;
  cursor: pointer;
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    display: block;
    background: ${(props) =>
      props.bookmarkChecked ? `url(${bookmarkFill})` : `url(${bookmarkLine})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: 7px;
  }
`;
