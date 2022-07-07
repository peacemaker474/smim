import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

function PostEditorPresenter({ modules, formats, onEditorStateChange, errors, paraData }) {
  return (
    <PostEditorWrap error={errors.para} palette='yellow'>
      <ReactQuill
        name='editor'
        style={{ height: '85%', marginBottom: '6%' }}
        modules={modules}
        formats={formats}
        theme='snow'
        onChange={onEditorStateChange}
        value={paraData}
      />
    </PostEditorWrap>
  );
}

export default PostEditorPresenter;

const PostEditorWrap = styled.div`
  margin-top: 30px;
  height: 400px;
  border: 2px solid
    ${({ palette, theme, error }) => (error ? theme.color['red'] : theme.color[palette])};
`;
