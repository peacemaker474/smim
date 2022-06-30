import React from 'react';
import CommentItemTextPresenter from './CommentItemText.style';

export default function CommentItemText({ cmntData, text }) {
  return <CommentItemTextPresenter writer={cmntData.writer.nickname} text={text} />;
}
