import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getReadPostDetail } from '../networks/post/http';
import PostContent from '../components/postDetail/molecules/PostContent';
import CmntContent from '../components/comment/molecules/CmntContent';
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

  if (isLoading || isFetching) return <LoadingPage position="absolute" top="50%" left="60%" />;

  return (
    <PostViewMain>
      <PostViewContainer>
        <PostContent postDetail={postDetail} />
        <CmntContent postDetail={postDetail} />
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
