import React from 'react';
import CommentItemTextPresenter from './CommentItemText.style';

export default function CommentItemText({ cmntData }) {
  return <CommentItemTextPresenter writer={cmntData.writer.nickname} text={cmntData.text} />;
}
