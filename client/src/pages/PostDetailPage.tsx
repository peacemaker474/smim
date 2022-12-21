import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getReadPostDetail } from '../networks/post/http';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getPostData } from '../redux/slice/postSlice';
import { getPinnedCommentData } from '../redux/services/comment';
import { initPinnedComment } from '../redux/slice/commentSlice';
import PostContent from '../components/postDetail/molecules/PostContent';
import CmntForm from '../components/comment/atoms/CmntForm';
import CommentUploaded from '../components/comment/organisms/CommentUploaded';
import CommentPinned from '../components/comment/organisms/CommentPinned';
import CommentCreated from '../components/comment/organisms/CommentCreated';
import LoadingPage from './LoadingPage';
import NotFoundPage from './NotFoundPage';

type Params = {
  id: string;
};

function PostDetailPage() {
  const { id: postId } = useParams<keyof Params>() as Params;
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const fetchAPI = async () => {
    try {
      const { data } = await getReadPostDetail(postId);

      if (data.meta.pinnedCmnt) {
        dispatch(getPinnedCommentData(data.meta.pinnedCmnt));
      } else {
        dispatch(initPinnedComment());
      }

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

  const { data: postDetail, isLoading, isFetching } = useQuery(['postDetail'], () => fetchAPI());

  if (postDetail === 404 || postDetail === 500 || postDetail === 400) {
    return <NotFoundPage />;
  }

  if (isLoading || isFetching) return <LoadingPage position="absolute" top="50%" left="60%" />;

  return (
    <PostViewMain>
      <PostViewContainer>
        <PostContent postDetail={postDetail} />
        <CommentSection>
          <CommentH2>답변하기</CommentH2>
          {accessToken ? (
            <CmntForm postId={postId} isTargetVisible />
          ) : (
            <CommentLogin> 로그인 후 답변을 작성해보세요.</CommentLogin>
          )}
          <CommentPinned />
          <CommentCreated />
          <CommentUploaded />
        </CommentSection>
      </PostViewContainer>
    </PostViewMain>
  );
}

export default PostDetailPage;

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

const CommentSection = styled.div`
  margin: 20px auto;
`;

const CommentH2 = styled.h2`
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  margin-bottom: 28px;
`;

const CommentLogin = styled.div`
  width: 100%;
  margin-bottom: 32px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.darkGray};
`;
