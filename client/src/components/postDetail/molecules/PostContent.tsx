import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelectorTyped } from '../../../redux/hooks';
import { deletePost } from '../../../networks/post/http';
import { modalToggle } from '../../../redux/slice/toggleSlice';
import { PostDetailData } from '../../../type/postTypes';
import PostHead from '../atoms/PostHead';
import PostBody from '../atoms/PostBody';
import Modal from '../../common/molecules/Modal';
import ReportBox from '../../common/molecules/ReportBox';

interface PostContentProps {
  postDetail: PostDetailData;
}

type Params = {
  id: string;
};

function PostContent({ postDetail }: PostContentProps) {
  const { id: postId } = useParams<keyof Params>() as Params;
  const { modalToggled, postToggled, accessToken } = useAppSelectorTyped((state) => ({
    modalToggled: state.toggle.modalToggled,
    postToggled: state.toggle.postToggled,
    accessToken: state.auth.accessToken,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const requestDelete = async (id: string, accessToken: string | null) => {
    await deletePost(id, accessToken);
    navigate(`/generation/${postDetail.targetAge}`);
  };

  const postViewActionFunc = () => {
    requestDelete(postId, accessToken);
    dispatch(modalToggle());
  };

  const postViewCancelFunc = () => {
    dispatch(modalToggle());
  };

  return (
    <PostBox>
      {modalToggled && (
        <Modal actionFunc={postViewActionFunc} cancelFunc={postViewCancelFunc}>
          게시물을 삭제하시겠습니까?
        </Modal>
      )}
      {postToggled && <ReportBox />}
      <PostHead postDetail={postDetail} />
      <PostBody postDetail={postDetail} />
    </PostBox>
  );
}
export default PostContent;

const PostBox = styled.div`
  margin-bottom: 32px;
`;
