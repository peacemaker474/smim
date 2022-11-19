import { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getReadPostDetail } from '../../../networks/post/http';
import LoadingPage from '../../../pages/LoadingPage';

interface fetchAPIProps {
  queryKey: any;
}

const PostHeadComponent = lazy(() => import('../atoms/PostHead'));
const PostBodyComponent = lazy(() => import('../atoms/PostBody'));

function PostContent() {
  const { id: postId } = useParams();

  const fetchAPI = async ({ queryKey }: fetchAPIProps) => {
    const { postId } = queryKey[1];

    try {
      const { data } = await getReadPostDetail(postId);
      return data;
    } catch (error: any) {
      return error.response.status;
    }
  };

  const { data: postDetail } = useQuery(['postDetail', { postId }], ({ queryKey }) => fetchAPI({ queryKey }));

  return (
    <PostBox>
      <Suspense fallback={<LoadingPage position="absolute" top="50%" left="60%" />}>
        <PostHeadComponent postDetail={postDetail} />
        <PostBodyComponent postDetail={postDetail} />
      </Suspense>
    </PostBox>
  );
}
export default PostContent;

const PostBox = styled.div`
  margin-bottom: 32px;
`;
