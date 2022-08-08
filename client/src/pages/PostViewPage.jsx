import React, { useEffect } from 'react';
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

function PostViewPage() {
  const modalVisible = useSelector((state) => state.toggle).modalToggled;
  const dispatch = useDispatch();
  const tkn = useSelector((state) => state.authToken).accessToken;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetComment());
    dispatch(resetPost());
    // persist config 관련해서 refactoring 예정
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
        <PostPost />
        <PostComment />
      </PostViewContainer>
    </PostViewMain>
  );
}

export default PostViewPage;

const PostViewMain = styled.main``;

const PostViewContainer = styled.div`
  margin: 100px auto 0;
  padding-top: 70px;
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
