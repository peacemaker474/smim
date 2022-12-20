import { useCallback } from 'react';
import { UseFormGetValues, UseFormWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { postToggle, modalToggle } from '../../../redux/slice/toggleSlice';
import { useAppDispatch, useAppSelectorTyped } from '../../../redux/hooks';
import { postCreateAndEditPost, deletePostImg } from '../../../networks/post/http';
import Modal from '../../common/molecules/Modal';
import { PostCreateFormValue } from '../../../type/postFormTypes';

interface ModalsProps {
  postId: string;
  pathValue: string;
  watch: UseFormWatch<any>;
  setView: React.Dispatch<React.SetStateAction<boolean>>;
  getValues: UseFormGetValues<PostCreateFormValue>;
}

function Modals({ postId, pathValue, watch, getValues, setView }: ModalsProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { modalToggled, postToggled, accessToken } = useAppSelectorTyped((state) => ({
    modalToggled: state.toggle.modalToggled,
    postToggled: state.toggle.postToggled,
    accessToken: state.auth.accessToken,
  }));

  const uploadPost = async (accessToken: string | null) => {
    const { title, para, tagArray, age } = watch();
    const data = {
      title,
      content: para,
      hashtag: tagArray,
      targetAge: age,
    };
    postCreateAndEditPost(data, accessToken, postId)
      .then((result) => {
        const { postId } = result.data;
        navigate(`/post/loading`);
        setTimeout(() => navigate(`/post/view/${postId}`), 4300);
      })
      .catch((err: any) => console.log(err));
  };

  const uploadActionFunc = () => {
    setView(false);
    uploadPost(accessToken);
    dispatch(postToggle());
  };

  const postCancelActionFunc = useCallback(() => {
    setView(false);
    const delData = getValues('para');
    deletePostImg(delData, accessToken);
    dispatch(modalToggle());
    navigate(-1);
  }, [dispatch, navigate, getValues, accessToken, setView]);

  const postCancelCancelFunc = () => {
    dispatch(modalToggle());
  };

  const uploadCancelFunc = useCallback(() => {
    dispatch(postToggle());
  }, [dispatch]);

  return (
    <>
      {postToggled && (
        <Modal actionFunc={uploadActionFunc} cancelFunc={uploadCancelFunc}>
          {pathValue === 'create' ? '게시물을 등록하겠습니까?' : ' 게시물을 수정하겠습니까?'}
        </Modal>
      )}
      {modalToggled && (
        <Modal actionFunc={postCancelActionFunc} cancelFunc={postCancelCancelFunc}>
          {'게시물을 취소하시겠습니까? \n 작성한 내용은 저장되지 않습니다.'}
        </Modal>
      )}
    </>
  );
}

export default Modals;
