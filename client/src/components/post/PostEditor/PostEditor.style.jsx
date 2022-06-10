import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

function PostEditorPresenter({ modules, formats, handleEditorWrite, contentInput, postData }) {
  return (
    <PostEditorWrap>
      <ReactQuill
        style={{ height: '85%', marginBottom: '6%' }}
        modules={modules}
        formats={formats}
        theme='snow'
        onChange={handleEditorWrite}
        ref={contentInput}
        value={postData.content}
      />
    </PostEditorWrap>
  );
}

export default PostEditorPresenter;

const PostEditorWrap = styled.div`
  margin-top: 30px;
  height: 400px;
`;
