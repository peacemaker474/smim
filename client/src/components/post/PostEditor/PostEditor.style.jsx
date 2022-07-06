import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';

function PostEditorPresenter({ modules, formats, register, control }) {
  return (
    <PostEditorWrap>
      <Controller
        control={control}
        name='test'
        render={({ onChange, onBlur, value, name, ref }, { invalid, isTouched, isDirty }) => (
          <ReactQuill
            name='editor'
            style={{ height: '85%', marginBottom: '6%' }}
            modules={modules}
            formats={formats}
            theme='snow'
            value={value}
            inputRef={ref}
            onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
          />
        )}
      />
    </PostEditorWrap>
  );
}

export default PostEditorPresenter;

const PostEditorWrap = styled.div`
  margin-top: 30px;
  height: 400px;
`;
