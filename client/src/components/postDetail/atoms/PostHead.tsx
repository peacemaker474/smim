import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { getPostView } from '../../../networks/post/http';
import { PostDetailData } from '../../../type/postTypes';
import Profile from '../../common/atoms/Profile';

interface PostHeadProps {
  postDetail: PostDetailData;
}

function PostHead({ postDetail }: PostHeadProps) {
  const { owner: author, updateAt } = postDetail;
  const [view, setView] = useState(0);

  const fetchAPI = useCallback(async () => {
    const view = await getPostView(postDetail._id);
    setView(view.data.data.views);
  }, [postDetail._id]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  const date = new Date(updateAt);
  const postDate = date.toLocaleDateString();

  return (
    <PostHeadDiv>
      <PostAuthor>
        <Profile width="42px" height="42px" imgUrl={author.imageUrl}>
          {author.nickname}
        </Profile>
      </PostAuthor>
      <PostAddOns>
        <AddOnSpan>{postDate}</AddOnSpan>
        <AddOnSpan>조회수 {view}</AddOnSpan>
        {/* {author.userId === userId && <PostDropdownBtn />} */}
      </PostAddOns>
    </PostHeadDiv>
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
