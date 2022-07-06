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
  modalOpen,
}) {
  return (
    <form
      id='upload'
      onSubmit={handleSubmit((data, e) => {
        e.preventDefault();
        console.log(data);
        modalOpen();
      })}
    >
      <PostTitle register={register} errors={errors} />
      <PostTargetAge register={register} errors={errors} />
      <PostTag register={register} errors={errors} setValue={setValue} watch={watch} />
      <PostEditor register={register} errors={errors} setValue={setValue} watch={watch} />
      <PostBottomBtn formState={pathValue} errors={errors} />
    </form>
  );
}
export default PostFormPresenter;
