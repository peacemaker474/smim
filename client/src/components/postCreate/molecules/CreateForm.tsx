import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import { usePrompt } from '../../../utils/blocker';
import { postUploadToggle, modalToggle } from '../../../redux/slice/toggleSlice';
import { postCreatePost, putPostEdit } from '../../../networks/post/http';
import { PostListData } from '../../../type/postTypes';
import Title from '../atoms/Title';
import TargetAge from '../atoms/TargetAge';
import TagInput from '../atoms/TagInput';
import Editor from '../atoms/Editor';
import Buttons from '../atoms/Buttons';
import Modal from '../../common/molecules/Modal';

interface ParaProps {
  para: string;
  img: Array<string>;
}
interface FormValue {
  title: string | null;
  tagArray: Array<string>;
  para: ParaProps;
  age: string | null;
}

interface CreateFormProps {
  postId: string;
  pathValue: string;
  postData: PostListData;
}

function CreateForm({ postData, pathValue, postId }: CreateFormProps) {
  const {
    register,
    setValue,
    // setError,
    handleSubmit,
    clearErrors,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormValue>({
    mode: 'onBlur',
  });

  const { postUploadToggled, modalToggled } = useAppSelector(
    (state) => ({
      postUploadToggled: state.toggle.postUploadToggled,
      modalToggled: state.toggle.modalToggled,
    }),
    shallowEqual,
  );

  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [view, setView] = useState(true);

  // usePrompt(
  //   '현재 페이지를 벗어나시겠습니까?',
  //   async () => {
  //     const delData = getValues('para');
  //     await axios.delete(`${process.env.REACT_APP_SERVER_URL}/post/img`, {
  //       data: {
  //         content: delData,
  //       },
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //   },
  //   view,
  // );

  useEffect(() => {
    setValue('title', '');
    setValue('para', { para: '', img: [] });
    setValue('age', '');
    setValue('tagArray', []);
  }, [setValue]);

  useEffect(() => {
    if (postData) {
      const { title, content, targetAge, hashtag } = postData;

      const myRegExp1 = /https:(.*?)(png|jpg|jpeg)/gi;
      const imgArray = (content.match(myRegExp1) || []).map((el) => decodeURI(el.split('com/')[1]));

      setValue('title', title);
      setValue('para', { para: content, img: [...imgArray] });
      setValue('age', String(targetAge));
      setValue('tagArray', hashtag);
    } else {
      setValue('title', '');
      setValue('para', { para: '', img: [] });
      setValue('age', '');
      setValue('tagArray', []);
    }
  }, [postData, setValue]);

  const uploadPost = async (accessToken: string | null) => {
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
        },
      )
        .then(() => {
          navigate(`/generation/${age}`);
        })
        .catch((err: any) => console.log(err));
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
        },
      )
        .then(() => {
          navigate(-1);
        })
        .catch((err: any) => console.log(err));
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
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/post/img`, {
      data: {
        content: delData,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
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
      <form id="upload" method="POST" onSubmit={handleSubmit(openPostFormModal)}>
        <Title register={register} errors={errors.title} />
        <TargetAge register={register} errors={errors.age} />
        <TagInput
          register={register}
          setValue={setValue}
          clearErrors={clearErrors}
          watch={watch}
          // setError={setError}
          // errors={errors.tagArray}
        />
        <Editor
          register={register}
          setValue={setValue}
          clearErrors={clearErrors}
          watch={watch}
          // setError={setError}
          // errors={errors.para}
        />
        <Buttons formState={pathValue} />
      </form>
    </>
  );
}
export default CreateForm;
