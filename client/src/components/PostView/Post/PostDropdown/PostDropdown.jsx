import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deletePost } from '../../../../network/post/http';
import PostDropdownPresenter from './PostDropdown.style';

function Dropdown({ postId }, ref) {
  const tkn = useSelector((state) => state.authToken).accessToken;
  let navigate = useNavigate();

  const handlePostEdit = (e) => {
    e.preventDefault();
    navigate(`/posts/edit/${postId}`);
  };
  const handlePostDel = async (e) => {
    e.preventDefault();
    await deletePost(postId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`,
      },
    });
  };
  return (
    <PostDropdownPresenter
      handlePostEdit={handlePostEdit}
      handlePostDel={handlePostDel}
      forwardRef={ref}
    />
  );
}

export const PostDropdown = React.forwardRef(Dropdown);
