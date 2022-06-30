import React from 'react';
import useVisible from '../../../../hooks/useVisible';
import CommentItemEtcPresenter from './CommentItemEtc.style';

export default function CommentItemEtc({ cmntData, groupId }) {
  const [isTargetVisible, handleClickShow] = useVisible(false);

  return (
    <CommentItemEtcPresenter
      isTargetVisible={isTargetVisible}
      handleClickShow={handleClickShow}
      createAt={cmntData.createAt}
      likeCount={cmntData.like_count}
      groupId={groupId}
      postId={cmntData.post_id}
      parentId={cmntData._id}
    />
  );
}
