import { useCallback } from 'react';
import { UseFormGetValues, UseFormWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { postUploadToggle, modalToggle } from '../../../redux/slice/toggleSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { postCreateAndEditPost, deletePostImg } from '../../../networks/post/http';
import Modal from '../../common/molecules/Modal';
import { PostCreateFormValue } from '../../../type/postFormTypes';

interface ModalsProps {
  postId: string;
  pathValue: string;
  postUploadToggled: boolean;
  watch: UseFormWatch<any>;
  accessToken: string | null;
  // setView: React.Dispatch<React.SetStateAction<boolean>>;
  getValues: UseFormGetValues<PostCreateFormValue>;
  openPostFormModal: () => void;
}

function Modals({
  postId,
  pathValue,
  postUploadToggled,
  openPostFormModal,
  watch,
  getValues,
  accessToken,
}: ModalsProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { modalToggled } = useAppSelector((state) => state.toggle);

  const uploadPost = async (accessToken: string | null) => {
    const { title, para, tagArray, age } = watch();
    const data = {
      title,
      content: para,
      hashtag: tagArray,
      targetAge: age,
    };

    postCreateAndEditPost(data, accessToken, postId)
      .then(() => {
        if (postId) {
          navigate(`/generation/${age}`);
        } else {
          navigate(-1);
        }
      })
      .catch((err: any) => console.log(err));
  };

  const uploadActionFunc = () => {
    uploadPost(accessToken);
    dispatch(postUploadToggle());
  };

  const uploadCancelFunc = useCallback(() => {
    dispatch(postUploadToggle());
  }, [dispatch]);

  const postActionFunc = useCallback(async () => {
    const delData = getValues('para');
    await deletePostImg(delData, accessToken);
    dispatch(modalToggle());
    navigate(-1);
  }, [dispatch, navigate, getValues, accessToken]);

  return (
    <>
      {postUploadToggled && (
        <Modal actionFunc={uploadActionFunc} cancelFunc={uploadCancelFunc}>
          {pathValue === 'create' ? '게시물을 등록하겠습니까?' : ' 게시물을 수정하겠습니까?'}
        </Modal>
      )}
      {modalToggled && (
        <Modal actionFunc={postActionFunc} cancelFunc={openPostFormModal}>
          {'게시물을 취소하시겠습니까? \n 작성한 내용은 저장되지 않습니다.'}
        </Modal>
      )}
    </>
  );
}

export default Modals;
