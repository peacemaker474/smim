import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import PostFormPresenter from './PostForm.style';
import Modal from '../../../components/common/Modal/Modal';
import { modalToggle } from '../../../redux/slice/toggleSlice';
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
  const modalVisible = useSelector((state) => state.toggle).modalToggled;
  const dispatch = useDispatch();
  const tkn = useSelector((state) => state.authToken).accessToken;
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

  const uploadPost = async (tkn) => {
    const { title, para, tagArray, age } = watch();

    if (pathValue === 'create') {
      postCreatePost(
        {
          title,
          content: para,
          hashtag: tagArray,
          targetAge: String(age),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
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
          targetAge: String(age),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        }
      )
        .then(() => {
          navigate(-1);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {modalVisible && (
        <Modal
          actionfunc={() => {
            uploadPost(tkn);
            dispatch(modalToggle());
          }}
          cancelFunc={() => dispatch(modalToggle())}
        >
          {pathValue === 'create' ? '게시물을 등록하겠습니까?' : ' 게시물을 수정하겠습니까?'}
        </Modal>
      )}
      <PostFormPresenter
        register={register}
        setValue={setValue}
        watch={watch}
        handleSubmit={handleSubmit}
        errors={errors}
        modalVisible={modalVisible}
        pathValue={pathValue}
        clearErrors={clearErrors}
        setError={setError}
        postData={postData}
      />
    </>
  );
}
export default PostForm;
