import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import PostFormPresenter from './PostForm.style';
import Modal from '../../../components/common/Modal/Modal';
import { modalToggle, postUploadToggle } from '../../../redux/slice/toggleSlice';
import { postCreatePost, putPostEdit } from '../../../network/post/http';

function PostForm({ postData, pathValue, postId }) {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onBlur', defaultValues: { tagArray: [], title: '', para: '', age: '' } });
  const { postUploadToggled, modalToggled } = useSelector((state) => state.toggle);
  const { accessToken } = useSelector((state) => state.authToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (postData) {
      const { title, content, targetAge, hashtag } = postData;
      setValue('title', title);
      setValue('para', content);
      setValue('age', targetAge);
      setValue('tagArray', hashtag);
    } else {
      setValue('title', '');
      setValue('para', '');
      setValue('age', '');
      setValue('tagArray', []);
    }
  }, [postData, setValue]);

  const uploadPost = async (accessToken) => {
    const { title, para, tagArray, age } = watch();

    if (pathValue === 'create') {
      postCreatePost(
        {
          title,
          content: para,
          hashtag: tagArray,
          targetAge: age,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then(() => {
          navigate('/');
        })
        .catch((err) => console.log(err));
    } else if (pathValue === 'edit') {
      putPostEdit(
        postId,
        {
          title,
          content: para,
          hashtag: tagArray,
          targetAge: age,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then(() => {
          navigate(-1);
        })
        .catch((err) => console.log(err));
    }
  };

  const uploadActionFunc = () => {
    uploadPost(accessToken);
    dispatch(postUploadToggle());
  };

  const uploadCancleFunc = () => {
    dispatch(postUploadToggle());
  };

  const postActionFunc = () => {
    dispatch(modalToggle());
    navigate(-1);
  };

  const postCancelFunc = () => {
    dispatch(modalToggle());
  };

  const openPostFormModal = () => {
    dispatch(postUploadToggle());
  };

  return (
    <>
      {postUploadToggled && (
        <Modal actionfunc={uploadActionFunc} cancelFunc={uploadCancleFunc}>
          {pathValue === 'create' ? '게시물을 등록하겠습니까?' : ' 게시물을 수정하겠습니까?'}
        </Modal>
      )}
      {modalToggled && (
        <Modal actionfunc={postActionFunc} cancelFunc={postCancelFunc}>
          {'게시물을 취소하시겠습니까? \n 작성한 내용은 저장되지 않습니다.'}
        </Modal>
      )}
      <PostFormPresenter
        register={register}
        setValue={setValue}
        watch={watch}
        onSubmit={handleSubmit}
        errors={errors}
        modalToggled={modalToggled}
        pathValue={pathValue}
        clearErrors={clearErrors}
        setError={setError}
        postData={postData}
        openPostFormModal={openPostFormModal}
      />
    </>
  );
}
export default PostForm;
