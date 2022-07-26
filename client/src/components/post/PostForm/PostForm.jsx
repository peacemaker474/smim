import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import PostFormPresenter from './PostForm.style';
import Modal from '../../../components/common/Modal/Modal';
import { modalToggle } from '../../../redux/slice/toggleSlice';
import { postCreatePost, putPostEdit } from '../../../network/post/http';

function PostForm({ postData = undefined, pathValue, postId }) {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onBlur', defaultValues: { tagArray: [] } });
  const modalVisible = useSelector((state) => state.toggle).modalToggled;
  const dispatch = useDispatch();
  const tkn = useSelector((state) => state.authToken).accessToken;
  const navigate = useNavigate();

  useEffect(() => {
    if (postData) {
      const { title, content, targetAge, hashtag } = postData;
      console.log(content);
      setValue('title', title);
      setValue('para', content);
      setValue('age', targetAge);
      setValue('tagArray', hashtag);
    }
  }, [postData, setValue]);

  const uploadPost = async (tkn) => {
    const title = watch('title');
    const content = watch('para');
    const hashtag = watch('tagArray');
    const targetAge = String(watch('age'));
    if (pathValue === 'create') {
      postCreatePost(
        {
          title,
          content,
          hashtag,
          targetAge,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        }
      )
        .then((res) => {
          console.log(res.data);
          navigate('/');
        })
        .catch((err) => console.log(err));
    } else if (pathValue === 'edit') {
      putPostEdit(
        postId,
        {
          title,
          content,
          hashtag,
          targetAge,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        }
      )
        .then((res) => {
          console.log(res.data);
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
      />
    </>
  );
}
export default PostForm;
