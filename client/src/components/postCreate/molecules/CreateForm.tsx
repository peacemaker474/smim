import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { postUploadToggle } from '../../../redux/slice/toggleSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import { usePrompt } from '../../../hooks';
import Title from '../atoms/Title';
import TargetAge from '../atoms/TargetAge';
import TagInput from '../atoms/TagInput';
import Editor from '../atoms/Editor';
import Buttons from '../atoms/Buttons';
import Modals from '../atoms/Modals';
import { PostCreateFormProps, PostCreateFormValue } from '../../../type/postFormTypes';

function CreateForm({ postData, pathValue, postId }: PostCreateFormProps) {
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    clearErrors,
    watch,
    getValues,
    formState: { errors },
  } = useForm<PostCreateFormValue>({
    mode: 'onBlur',
  });

  const { accessToken } = useAppSelector((state) => state.auth);
  const { postUploadToggled } = useAppSelector((state) => state.toggle);
  const dispatch = useAppDispatch();
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

  const openPostFormModal = useCallback(() => {
    dispatch(postUploadToggle());
  }, [dispatch]);

  return (
    <>
      <Modals
        postId={postId}
        pathValue={pathValue}
        postUploadToggled={postUploadToggled}
        watch={watch}
        accessToken={accessToken}
        // setView={setView}
        getValues={getValues}
        openPostFormModal={openPostFormModal}
      />
      <form id="upload" method="POST" onSubmit={handleSubmit(openPostFormModal)}>
        <Title register={register} errors={errors.title} />
        <TargetAge register={register} errors={errors.age} />
        <TagInput
          register={register}
          setValue={setValue}
          clearErrors={clearErrors}
          watch={watch}
          setError={setError}
          errors={errors.tagArray}
        />
        <Editor
          register={register}
          setValue={setValue}
          clearErrors={clearErrors}
          watch={watch}
          setError={setError}
          errors={errors.para}
        />
        <Buttons formState={pathValue} />
      </form>
    </>
  );
}
export default CreateForm;
