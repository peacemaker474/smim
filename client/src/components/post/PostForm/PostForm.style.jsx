import React from 'react';
import PostTitle from '../PostTitle/PostTitle';
import PostTargetAge from '../PostTargetAge/PostTargetAge';
// import PostTag from '../PostTag/PostTag';
import PostEditor from '../PostEditor/PostEditor';

function PostFormPresenter({ register, handleSubmit, errors, control }) {
  return (
    <form
      id='upload'
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <PostTitle register={register} errors={errors} />
      <PostTargetAge register={register} errors={errors} />
      {/* <PostTag register={register} />
      <PostEditor register={register} control={control} /> */}
      <PostEditor register={register} errors={errors} control={control} />
      <button type='submit'>Submit</button>
    </form>
  );
}
export default PostFormPresenter;
