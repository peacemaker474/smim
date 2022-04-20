import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { contentAdd } from '../../redux/post/action';

const PostEditorWrap = styled.div`
  margin-top: 30px;
  height: 400px;
`;

function Posteditor() {
  const [para, setPara] = useState('');
  const dispatch = useDispatch();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      [{ align: [] }, { color: [] }, { background: [] }],
      ['clean'],
    ],
  };

  const handleFormBlur = () => {
    dispatch(contentAdd(para));
  };

  return (
    <PostEditorWrap onBlur={handleFormBlur}>
      <ReactQuill
        modules={modules}
        style={{ height: '85%', marginBottom: '6%' }}
        onChange={(value) => {
          setPara(value);
        }}
      />
    </PostEditorWrap>
  );
}

export default Posteditor;
