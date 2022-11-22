import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useAppSelector } from '../../../redux/hooks';
import { getPostView } from '../../../networks/post/http';
import { PostDetailData } from '../../../type/postTypes';
import Profile from '../../common/atoms/Profile';
import DropdownBox from '../../common/molecules/DropdownBox';

interface fetchAPIProps {
  queryKey: any;
}
interface PostHeadProps {
  postDetail: PostDetailData;
}

function PostHead({ postDetail }: PostHeadProps) {
  const { owner: author, updateAt } = postDetail;
  const { loginCheck } = useAppSelector((state) => state.user);
  const channelId = postDetail?._id;

  const fetchAPIOne = async ({ queryKey }: fetchAPIProps) => {
    const { channelId } = queryKey[1];

    try {
      const { data } = await getPostView(channelId);
      return data;
    } catch (error: any) {
      return error.response.status;
    }
  };

  const { data: views } = useQuery(['postView', { channelId }], ({ queryKey }) => fetchAPIOne({ queryKey }), {
    enabled: !!channelId,
  });

  const date = new Date(updateAt);
  const postDate = date.toLocaleDateString();

  return (
    <>
      <PostViewH2>{postDetail.targetAge}대에게</PostViewH2>
      <PostTitle>{postDetail.title}</PostTitle>
      <PostHeadDiv>
        <PostAuthor>
          <Profile width="42px" height="42px" imgUrl={author.imageUrl}>
            {author.nickname}
          </Profile>
        </PostAuthor>
        <PostAddOns>
          <AddOnSpan>{postDate}</AddOnSpan>
          <AddOnSpan>조회수 {views?.data.views}</AddOnSpan>
          {loginCheck && <DropdownBox />}
        </PostAddOns>
      </PostHeadDiv>
    </>
  );
}
export default PostHead;

const PostHeadDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 17px;
  border-bottom: 1px ${({ theme }) => theme.color.lightGray} solid;
  margin-bottom: 30px;
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

const PostAuthor = styled.h4`
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.black};
`;

const PostAddOns = styled.div`
  display: flex;
  align-items: center;
`;

const AddOnSpan = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.color.gray};
  margin-right: 10px;
`;
