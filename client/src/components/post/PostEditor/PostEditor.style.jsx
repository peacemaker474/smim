import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

function PostEditorPresenter({
  modules,
  formats,
  onEditorStateChange,
  errors,
  paraData,
  onEditorCheckError,
}) {
  return (
    <PostEditorWrap error={errors.para} palette='yellow'>
      <CustomReactQuill
        name='editor'
        modules={modules}
        formats={formats}
        theme='snow'
        onChange={onEditorStateChange}
        value={paraData}
        onBlur={onEditorCheckError}
      />
    </PostEditorWrap>
  );
}

export default PostEditorPresenter;

const PostEditorWrap = styled.div`
  margin-top: 30px;
  height: 400px;
  border: 2px solid
    ${({ palette, theme, error }) => (error ? theme.color['lightGray'] : theme.color[palette])};
`;
const CustomReactQuill = styled(ReactQuill)`
  border: none;
  height: 90%;
`;
