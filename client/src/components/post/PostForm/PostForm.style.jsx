import React from 'react';
import PostTitle from '../PostTitle/PostTitle';
import PostTargetAge from '../PostTargetAge/PostTargetAge';
import PostTag from '../PostTag/PostTag';
import PostEditor from '../PostEditor/PostEditor';
import PostBottomBtn from '../../../components/post/PostBottomBtn/PostBottomBtn';

function PostFormPresenter({
  register,
  handleSubmit,
  errors,
  setValue,
  watch,
  pathValue,
  clearErrors,
  setError,
  postData,
}) {
  return (
    <div id='upload'>
      <PostTitle register={register} errors={errors} />
      <PostTargetAge register={register} errors={errors} />
      <PostTag
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
        clearErrors={clearErrors}
        setError={setError}
      />
      <PostEditor
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
        clearErrors={clearErrors}
        setError={setError}
        postData={postData}
      />
      <PostBottomBtn formState={pathValue} errors={errors} handleSubmit={handleSubmit} />
    </div>
  );
}
export default PostFormPresenter;
