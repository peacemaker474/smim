import styled from 'styled-components';
import TagList from '../../common/atoms/TagList';
import { PostDetailData } from '../../../type/postTypes';
// import EtcSpan from '../../common/atoms/EtcSpan';

interface PostBodyProps {
  postDetail: PostDetailData;
}

function PostBody({ postDetail }: PostBodyProps) {
  return (
    <BodyBox>
      <PostContent>
        <PostPara dangerouslySetInnerHTML={{ __html: postDetail.content }} />
      </PostContent>
      <TagList hashtagArr={postDetail.hashtag} />
    </BodyBox>
  );
}
export default PostBody;

const BodyBox = styled.div``;

const PostContent = styled.div`
  width: 100%;
  padding: 48px 0;
`;

const PostPara = styled.div`
  font-size: 15px;
  font-weight: 500;
  line-height: 23px;
  margin-bottom: 60px;
  & > p {
    width: 100%;
    word-break: break-word;
  }
  & > p > img {
    max-width: 100%;
  }
`;

// const PostLikeBox = styled.div`
//   display: flex;
//   justify-content: center;
//   margin: 40px 0;
// `;
