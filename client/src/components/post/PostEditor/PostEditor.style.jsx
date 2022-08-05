import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

function PostEditorPresenter({
  modules,
  formats,
  onEditorStateChange,
  errors,
  registerRef,
  quillRef,
  text,
  onEditorSetValue,
}) {
  return (
    <PostEditorWrap error={errors.para} palette='yellow' onBlur={onEditorSetValue}>
      <CustomReactQuill
        name='editor'
        modules={modules}
        formats={formats}
        theme='snow'
        onChange={onEditorStateChange}
        ref={(e) => {
          registerRef(e);
          quillRef.current = e;
        }}
        value={text}
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

  @media screen and (max-width: 550px) {
    height: 78%;
  }
  @media (min-width: 550px) and (max-width: 992px) {
    height: 84%;
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    height: 90%;
  }
  @media (min-width: 1200px) {
    height: 90%;
  }
`;
