// import { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { deletePost } from '../../../networks/post/http';
import { modalToggle } from '../../../redux/slice/toggleSlice';
import { PostDetailData } from '../../../type/postTypes';
import PostHead from '../atoms/PostHead';
import PostBody from '../atoms/PostBody';
import Modal from '../../common/molecules/Modal';

interface PostContentProps {
  postDetail: PostDetailData;
}

function PostContent({ postDetail }: PostContentProps) {
  const { id: postId } = useParams();
  const { modalToggled } = useAppSelector((state) => state.toggle);
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const requestDelete = async (id: string | undefined, accessToken: string | null) => {
    await deletePost(id, accessToken);
    navigate(`/generation/${postDetail.targetAge}`);
  };

  const postViewActionFunc = () => {
    requestDelete(postId, accessToken);
    dispatch(modalToggle());
  };

  const postViewCancelFunc = () => {
    dispatch(modalToggle());
  };

  return (
    <PostBox>
      {modalToggled && (
        <Modal actionFunc={postViewActionFunc} cancelFunc={postViewCancelFunc}>
          게시물을 삭제하시겠습니까?
        </Modal>
      )}
      <PostHead postDetail={postDetail} />
      <PostBody postDetail={postDetail} />
    </PostBox>
  );
}
export default PostContent;

const PostBox = styled.div`
  margin-bottom: 32px;
`;
