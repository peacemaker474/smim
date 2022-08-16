import React from 'react';
import styled from 'styled-components';
import heartFill from '../../../../asset/icon/icon-heart-fill.svg';
import heartLine from '../../../../asset/icon/icon-heart-line.svg';

export default function PostLikePresenter({ onLikeClick, isLikeChecked, likeValue }) {
  return (
    <PostLikeSpan onClick={onLikeClick} likechecked={isLikeChecked}>
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
    background: ${(props) => (props.likechecked ? `url(${heartFill})` : `url(${heartLine})`)};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-right: 7px;
  }
`;
