import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getReadPostDetail } from '../networks/post/http';
import PostContent from '../components/postDetail/molecules/PostContent';
import CmntForm from '../components/comment/atoms/CmntForm';
import CommentUploaded from '../components/comment/organisms/CommentUploaded';
import CommentPinned from '../components/comment/organisms/CommentPinned';
import CommentCreated from '../components/comment/organisms/CommentCreated';
import LoadingPage from './LoadingPage';

function PostDetailPage() {
  const { id: postId } = useParams();
  const fetchAPI = async () => {
    try {
      const { data } = await getReadPostDetail(postId);
      return data;
    } catch (error: any) {
      return error.response.status;
    }
  };

  const { data: postDetail, isLoading, isFetching } = useQuery(['postDetail'], () => fetchAPI());

  const postDetailReset = {
    bookmark: false,
    content: '',
    createAt: '',
    hashtag: [],
    like: false,
    meta: { views: 0, likes: 0, bookmarks: [], pinnedCmnt: null, answer: false },
    owner: { _id: '', userId: '', nickname: '', imageUrl: '' },
    targetAge: '',
    title: '',
    updateAt: '',
    __v: 0,
    _id: '',
  };

  if (isLoading || isFetching) return <LoadingPage position="absolute" top="50%" left="60%" />;

  console.log(postDetail);

  return (
    <PostViewMain>
      <PostViewContainer>
        <PostContent postDetail={postDetail || postDetailReset} />
        <CommentSection>
          <CommentH2>답변하기</CommentH2>
          <CmntForm postId={postId} isTargetVisible />
          <CommentUploaded />
          <CommentPinned postWriter={postDetail?.owner.nickname} />
          <CommentCreated />
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
  width: 100%;
  margin: 20px auto;
`;

const CommentH2 = styled.h2`
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  margin-bottom: 28px;
`;

const CommentContainer = styled.div``;
