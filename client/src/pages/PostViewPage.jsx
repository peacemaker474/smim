import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostPost from '../components/postview/Post/PostPost/PostPost';
import PostComment from '../components/postview/Comment/PostComment/PostComment';
import styled from 'styled-components';
import Modal from '../components/common/Modal/Modal';
import { modalToggle } from '../redux/slice/toggleSlice';
import { deletePost } from '../network/post/http';
import { resetComment } from '../redux/slice/commentCreateSlice';
import { resetPost } from '../redux/slice/postSlice';
import NotFound from '../pages/NotFound';

function PostViewPage() {
  const modalVisible = useSelector((state) => state.toggle).modalToggled;
  const dispatch = useDispatch();
  const tkn = useSelector((state) => state.authToken).accessToken;
  const { id } = useParams();
  const navigate = useNavigate();
  const regExp = /[0-9a-f]{24}/g;
  const [postViewState, setPostViewState] = useState(false);

  useEffect(() => {
    dispatch(resetComment());
    dispatch(resetPost());
  }, [dispatch]);

  if (!(id.length === 24 && regExp.test(id)) || postViewState) {
    return <NotFound />;
  }

  const requestDelete = async (id, tkn) => {
    await deletePost(id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`,
      },
    });
    navigate(-2);
  };

  return (
    <PostViewMain>
      <PostViewContainer>
        {modalVisible && (
          <Modal
            actionfunc={() => {
              requestDelete(id, tkn);
              dispatch(modalToggle());
            }}
            cancelFunc={() => dispatch(modalToggle())}
          >
            게시물을 삭제하시겠습니까?
          </Modal>
        )}
        <PostPost setPostViewState={setPostViewState} />
        {tkn && <PostComment />}
      </PostViewContainer>
    </PostViewMain>
  );
}

export default PostViewPage;

const PostViewMain = styled.main``;

const PostViewContainer = styled.div`
  margin: 100px auto 0;
  padding-top: 70px;
  padding-bottom: 50px;
  @media (max-width: 612px) {
    width: 328px;
  }
  @media (min-width: 612px) and (max-width: 768px) {
    width: 506px;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    width: 640px;
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    width: 770px;
  }
  @media (min-width: 1200px) {
    width: 900px;
  }
`;
