import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { isLoginCheckToggle, modalToggle, postToggle } from '../../../redux/slice/toggleSlice';
import { getPostView } from '../../../networks/post/http';
import { PostDetailData } from '../../../type/postTypes';
import Profile from '../../common/atoms/Profile';
import DropdownBox from '../../common/molecules/DropdownBox';
import UserAge from '../../common/atoms/Age';

interface PostHeadProps {
  postDetail: PostDetailData;
}

function PostHead({ postDetail }: PostHeadProps) {
  const { owner: author, updateAt } = postDetail;
  const { accessToken } = useAppSelector((state) => state.auth);
  const { id: userId } = useAppSelector((state) => state.user);
  const channelId = postDetail._id;
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const handleModalShow = () => {
    dispatch(modalToggle());
  };

  const fetchAPI = async () => {
    try {
      const { data } = await getPostView(channelId);
      return data;
    } catch (error: any) {
      return error.response.status;
    }
  };

  const { data: views } = useQuery(['postView', { channelId }], () => fetchAPI(), {
    enabled: !!channelId,
  });

  const date = new Date(updateAt);
  const postDate = date.toLocaleDateString();

  const handleCommentDeclaration = () => {
    if (!accessToken) {
      dispatch(isLoginCheckToggle());
      return;
    }
    dispatch(postToggle());
  };

  return (
    <>
      <PostViewH2>{postDetail.targetAge}대에게</PostViewH2>
      <PostTitle>{postDetail.title}</PostTitle>
      <PostHeadDiv>
        <PostAuthor>
          <Profile width="42px" height="42px" imgUrl={author.imageUrl}>
            {author.nickname}
          </Profile>
          <UserAge margin="0 0 15px 9px">{author.ageGroup}</UserAge>
        </PostAuthor>
        <PostAddOns>
          <AddOnSpan>{postDate}</AddOnSpan>
          <AddOnSpan>조회수 {views?.data.views}</AddOnSpan>
          <DropdownBox>
            <DropdownLists>
              {author.userId === userId ? (
                <>
                  <DropdownList>
                    <DropdownLink to={`/post/edit/${id}`}>수정</DropdownLink>
                  </DropdownList>
                  <DropdownList onClick={handleModalShow}>삭제</DropdownList>
                </>
              ) : (
                <DropdownList onClick={handleCommentDeclaration}>신고</DropdownList>
              )}
            </DropdownLists>
          </DropdownBox>
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
  & > div > span {
    font-size: 14px;
    line-height: 35px;
    margin-left: 10px;
  }
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

const DropdownLists = styled.ul`
  width: 100%;
  height: 100%;
  font-size: '13px';
`;

const DropdownList = styled.li`
  width: 100%;
  height: 50%;
  text-align: center;
  line-height: 34px;
  cursor: pointer;
  &:hover {
    background-color: rgba(127, 127, 127, 0.1);
  }
`;

const DropdownLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: inline-block;
`;
