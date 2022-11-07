import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Title from '../atoms/Title';
import TargetAge from '../atoms/TargetAge';
import TagInput from '../atoms/TagInput';
import Editor from '../atoms/Editor';
import Buttons from '../atoms/Buttons';
import Modal from '../../common/molecules/Modal';

interface ParaProps {
  p: string;
  img: Array<string>;
}
interface FormValue {
  title: '';
  tagArray: Array<string>;
  para: ParaProps;
  age: '';
}

function CreateForm() {
  const {
    register,
    setValue,
    // setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<FormValue>({
    mode: 'onBlur',
  });
  const { pathname } = useLocation();
  const pathArr = pathname.split('/');
  const pathValue = pathArr[2];

  const postUploadToggled = false;

  useEffect(() => {
    setValue('title', '');
    setValue('para', { p: '', img: [] });
    setValue('age', '');
    setValue('tagArray', []);
  }, [setValue]);

  const uploadActionFunc = () => {
    // setView(false);
    // uploadPost(accessToken);
    // dispatch(postUploadToggle());
  };

  const uploadCancleFunc = () => {
    // dispatch(postUploadToggle());
  };

  return (
    <>
      {postUploadToggled && (
        <Modal actionFunc={uploadActionFunc} cancelFunc={uploadCancleFunc}>
          {pathValue === 'create' ? '게시물을 등록하겠습니까?' : ' 게시물을 수정하겠습니까?'}
        </Modal>
      )}
      <form id="upload" method="POST">
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
        <Buttons />
      </form>
    </>
  );
}
export default CreateForm;
