import React from 'react';
import PostTargetAge from './PostTargetAge';
import Posteditor from './posteditor';
import PostTitle from './PostTitle';
import PostTag from './PostTag';

function PostForm({ saveData, postData }) {
  return (
    <form id='upload'>
      <PostTitle saveData={saveData} />
      <PostTargetAge saveData={saveData} />
      <PostTag saveData={saveData} postData={postData} />
      <Posteditor saveData={saveData} />
    </form>
  );
}
export default PostForm;
