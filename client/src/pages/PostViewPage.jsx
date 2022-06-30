import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetComment } from '../redux/slice/commentCreateSlice';
import PostPost from '../components/postview/Post/PostPost/PostPost';
import PostComment from '../components/postview/Comment/PostComment/PostComment';
import styled from 'styled-components';
import Modal from '../components/common/Modal/Modal';
import { deletePost } from '../network/post/http';
import { modalToggle } from '../redux/slice/toggleSlice';
const PostViewContainer = styled.div`
  margin-top: 10vh;
  padding-top: 70px;
`;

export default function PostViewPage() {
  const modalVisible = useSelector((state) => state.toggle).modalToggled;
  const location = useLocation();
  const id = location.pathname.split('view/')[1];
  const dispatch = useDispatch();
  const tkn = useSelector((state) => state.authToken).accessToken;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetComment());
  }, [dispatch]);

  const requestDelete = async (id, tkn) => {
    const response = await deletePost(id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`,
      },
    });
    console.log(response.data);
    navigate(-1);
  };

  return (
    <PostViewContainer>
      {modalVisible && (
        <Modal
          actionfunc={() => {
            requestDelete(id, tkn);
            dispatch(modalToggle());
          }}
          cancelFunc={() => dispatch(modalToggle())}
        >
          게시물을 삭제하시겠습니까/
        </Modal>
      )}
      <PostPost postId={id} />
      <PostComment postId={id} />
    </PostViewContainer>
  );
}
