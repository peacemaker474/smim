import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getReadPostDetail } from '../../../networks/post/http';
import PostHead from '../atoms/PostHead';
import PostBody from '../atoms/PostBody';

interface fetchAPIProps {
  queryKey: any;
}

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
      <PostViewH2>{postDetail.targetAge}대에게</PostViewH2>
      <PostTitle>{postDetail.title}</PostTitle>
      <PostHead postDetail={postDetail} />
      <PostBody postDetail={postDetail} />
    </PostBox>
  );
}
export default PostContent;

const PostBox = styled.div`
  margin-bottom: 32px;
`;
const PostViewH2 = styled.h1`
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;
  color: ${({ theme }) => theme.color.black};
  margin: 0 auto 12px;
`;

const PostTitle = styled.h3`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 68px;
  color: ${({ theme }) => theme.color.black};
  margin-bottom: 56px;
`;
