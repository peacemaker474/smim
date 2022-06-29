import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostDropdownPresenter from './PostDropdown.style';
import { useDispatch } from 'react-redux';
import { modalToggle } from '../../../../redux/slice/toggleSlice';

function Dropdown({ postId }, ref) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePostEdit = (e) => {
    e.preventDefault();
    navigate(`/posts/edit/${postId}`);
  };
  const handlePostDel = async (e) => {
    e.preventDefault();
    dispatch(modalToggle());
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
