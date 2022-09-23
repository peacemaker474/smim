import React from 'react';
import styled from 'styled-components';
import heartFill from '../../../../asset/icon/icon-heart-fill.svg';
import heartLine from '../../../../asset/icon/icon-heart-line.svg';

export default function CommentLikeBtnPresenter({ like, onCommentLike, likeCount }) {
  return (
    <CommentLike like={like} onClick={onCommentLike}>
      {likeCount}
    </CommentLike>
  );
}

const CommentLike = styled.button`
  display: flex;
  align-items: center;
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    display: block;
    background: url(${(props) => (props.like ? `${heartFill}` : `${heartLine}`)});
    background-position: center;
    background-size: contain;
    margin-right: 4px;
  }
`;
