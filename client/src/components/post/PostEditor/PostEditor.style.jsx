import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

function PostEditorPresenter({
  modules,
  formats,
  onEditorStateChange,
  settingRegisterRef,
  errors,
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
        ref={settingRegisterRef}
        value={text}
      />
    </PostEditorWrap>
  );
}

export default PostEditorPresenter;

const PostEditorWrap = styled.div`
  margin-top: 30px;
  height: 580px;
  border: 2px solid
    ${({ palette, theme, error }) => (error ? theme.color['lightGray'] : theme.color[palette])};
  @media screen and (max-width: 550px) {
    height: 602px;
  }
`;
const CustomReactQuill = styled(ReactQuill)`
  border: none;

  @media screen and (max-width: 550px) {
    height: 85%;
  }
  @media (min-width: 550px) and (max-width: 992px) {
    height: 89%;
  }
  @media (min-width: 992px) {
    height: 93%;
  }
`;
