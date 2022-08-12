import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostDropdownPresenter from './PostDropdown.style';
import { useDispatch } from 'react-redux';
import { modalToggle } from '../../../../redux/slice/toggleSlice';

function Dropdown(props, ref) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const handlePostDel = async (e) => {
    e.preventDefault();
    dispatch(modalToggle());
    navigate(-1);
  };
  return <PostDropdownPresenter handlePostDel={handlePostDel} forwardRef={ref} postId={postId} />;
}

export const PostDropdown = React.forwardRef(Dropdown);
