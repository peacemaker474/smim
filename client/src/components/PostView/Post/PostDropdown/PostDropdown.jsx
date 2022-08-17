import React from 'react';
import { useParams } from 'react-router-dom';
import PostDropdownPresenter from './PostDropdown.style';
import { useDispatch } from 'react-redux';
import { modalToggle } from '../../../../redux/slice/toggleSlice';

function Dropdown(props, ref) {
  const dispatch = useDispatch();
  const { id: postId } = useParams();
  const handlePostDel = async (e) => {
    e.preventDefault();
    dispatch(modalToggle());
  };
  return <PostDropdownPresenter onPostDel={handlePostDel} forwardRef={ref} postId={postId} />;
}

export const PostDropdown = React.forwardRef(Dropdown);
