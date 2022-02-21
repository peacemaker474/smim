import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { contentAdd } from '../../redux/post/action';

const PostEditorWrap = styled.div`
  margin-top: 30px;
  height: 400px;
`;

function Posteditor() {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.postReducer.content);

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

  console.log(content);

  return (
    <PostEditorWrap>
      <ReactQuill
        modules={modules}
        style={{ height: '85%', marginBottom: '6%' }}
        onChange={(content) => dispatch(contentAdd(content))}
      />
    </PostEditorWrap>
  );
}

export default Posteditor;
