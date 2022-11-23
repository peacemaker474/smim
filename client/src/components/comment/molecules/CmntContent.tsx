import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import CmntForm from '../atoms/CmntForm';
import { PostDetailData } from '../../../type/postTypes';

interface CmntContentProps {
  postDetail: PostDetailData;
}

function CmntContent({ postDetail }: CmntContentProps) {
  // const { accessToken } = useAppSelector((state) => state.auth);
  const { id: postId } = useParams();

  return (
    <CommentSection>
      <CommentH2>답변하기</CommentH2>
      <CmntForm postId={postId} />
    </CommentSection>
  );
}
export default CmntContent;

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
