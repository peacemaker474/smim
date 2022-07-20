import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoginCheckToggle } from '../../../../redux/slice/toggleSlice';
import CommentItemEtcPresenter from './CommentItemEtc.style';

export default function CommentItemEtc({ cmntData, groupId, setInputVisible }) {
  const tkn = useSelector((state) => state.authToken).accessToken;
  const dispatch = useDispatch();

  return (
    <CommentItemEtcPresenter
      handleClickShow={() => {
        if (tkn) {
          setInputVisible(true);
        } else {
          dispatch(isLoginCheckToggle());
        }
      }}
      createAt={cmntData.createAt}
      groupId={groupId}
      postId={cmntData.post_id}
      parentId={cmntData._id}
      id={cmntData._id}
      cmntData={cmntData}
    />
  );
}
