import styled from 'styled-components';
import PostContent from '../components/postDetail/molecules/PostContent';

function PostDetailPage() {
  return (
    <PostViewMain>
      <PostViewContainer>
        {/* {modalToggled && (
            <Modal actionFunc={postViewActionFunc} cancelFunc={postViewCancelFunc}>
              게시물을 삭제하시겠습니까?
            </Modal>
          )} */}
        <PostContent />
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
