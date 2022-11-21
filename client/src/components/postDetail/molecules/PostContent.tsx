// import { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { getReadPostDetail, deletePost } from '../../../networks/post/http';
import { getPostData } from '../../../redux/slice/postSlice';
import { modalToggle } from '../../../redux/slice/toggleSlice';
import LoadingPage from '../../../pages/LoadingPage';
import PostHead from '../atoms/PostHead';
import PostBody from '../atoms/PostBody';
import Modal from '../../common/molecules/Modal';

interface fetchAPIProps {
  queryKey: any;
}

function PostContent() {
  const { id: postId } = useParams();
  const user = useAppSelector((state) => state.user);
  const { modalToggled } = useAppSelector((state) => state.toggle);
  const { accessToken } = useAppSelector((state) => state.auth);
  const { postAge } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchAPI = async ({ queryKey }: fetchAPIProps) => {
    const { postId } = queryKey[1];

    try {
      const { data } = await getReadPostDetail(postId);
      dispatch(
        getPostData({
          postId: data._id,
          postWriter: data.owner.nickname,
          postAge: data.targetAge,
        }),
      );
      return data;
    } catch (error: any) {
      return error.response.status;
    }
  };

  const requestDelete = async (id: string | undefined, accessToken: string | null) => {
    await deletePost(id, accessToken);
    navigate(`/generation/${postAge}`);
  };

  const postViewActionFunc = () => {
    requestDelete(postId, accessToken);
    dispatch(modalToggle());
  };

  const postViewCancelFunc = () => {
    dispatch(modalToggle());
  };

  const {
    data: postDetail,
    isLoading,
    isFetching,
  } = useQuery(['postDetail', { postId }], ({ queryKey }) => fetchAPI({ queryKey }));

  if (isLoading || isFetching) return <LoadingPage position="absolute" top="50%" left="60%" />;

  return (
    <PostBox>
      {modalToggled && (
        <Modal actionFunc={postViewActionFunc} cancelFunc={postViewCancelFunc}>
          게시물을 삭제하시겠습니까?
        </Modal>
      )}
      <PostHead postDetail={postDetail} loginState={user.loginCheck} />
      <PostBody postDetail={postDetail} loginState={user.loginCheck} />
    </PostBox>
  );
}
export default PostContent;

const PostBox = styled.div`
  margin-bottom: 32px;
`;
