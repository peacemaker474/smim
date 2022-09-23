import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useForm } from 'react-hook-form';
import { usePrompt } from '../../../utils/blocker.js';
import PostFormPresenter from './PostForm.style';
import Modal from '../../../components/common/Modal/Modal';
import { modalToggle, postUploadToggle } from '../../../redux/slice/toggleSlice';
import { postCreatePost, putPostEdit } from '../../../network/post/http';
import axios from 'axios';

function PostForm({ postData, pathValue, postId }) {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    clearErrors,
    setError,
    getValues,
    formState: { errors },
  } = useForm({ 
    mode: 'onBlur', 
    defaultValues: { 
      tagArray: [], 
      title: '', 
      para: '', 
      age: '' } 
    });
  const { postUploadToggled, modalToggled } = useSelector(
    (state) => ({
      postUploadToggled: state.toggle.postUploadToggled,
      modalToggled: state.toggle.modalToggled,
    }),
    shallowEqual
  );
  const { accessToken } = useSelector((state) => state.authToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [view, setView] = useState(true);

  usePrompt('현재 페이지를 벗어나시겠습니까?', view, async () => {
    const delData = getValues('para');
    await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/post/img`,
      {
        data: {
          content: delData,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  useEffect(() => {
    if (postData) {
      const { title, content, targetAge, hashtag } = postData;

      const myRegExp1 = /https:(.*?)(png|jpg|jpeg)/gi;
      const imgArray = (content.match(myRegExp1) || []).map((el) => decodeURI(el.split('com/')[1]));

      setValue('title', title);
      setValue('para', { para: content, img: [...imgArray] });
      setValue('age', targetAge);
      setValue('tagArray', hashtag);
    } else {
      setValue('title', '');
      setValue('para', { para: '', img: [] });
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
          navigate(`/generation/${age}`);
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
    setView(false);
    uploadPost(accessToken);
    dispatch(postUploadToggle());
  };

  const uploadCancleFunc = useCallback(() => {
    dispatch(postUploadToggle());
  }, [dispatch]);

  const postActionFunc = useCallback(async () => {
    setView(false);
    const delData = getValues('para');
    await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/post/img`,
      {
        data: {
          content: delData,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(modalToggle());
    navigate(-1);
  }, [dispatch, navigate, getValues, accessToken]);

  const postCancelFunc = useCallback(() => {
    dispatch(modalToggle());
  }, [dispatch]);

  const openPostFormModal = useCallback(() => {
    dispatch(postUploadToggle());
  }, [dispatch]);

  return (
    <>
      {postUploadToggled && (
        <Modal actionFunc={uploadActionFunc} cancelFunc={uploadCancleFunc}>
          {pathValue === 'create' ? '게시물을 등록하겠습니까?' : ' 게시물을 수정하겠습니까?'}
        </Modal>
      )}
      {modalToggled && (
        <Modal actionFunc={postActionFunc} cancelFunc={postCancelFunc}>
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
