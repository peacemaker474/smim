import React from 'react';
import { useForm } from 'react-hook-form';
import PostFormPresenter from './PostForm.style';

function PostForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  return (
    <PostFormPresenter
      register={register}
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
    />
  );
}
export default PostForm;
