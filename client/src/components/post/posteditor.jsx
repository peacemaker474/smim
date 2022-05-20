import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { resetCheck } from '../../redux/postForm/action';
import { contentAdd } from '../../redux/post/action';

const PostEditorWrap = styled.div`
  margin-top: 30px;
  height: 400px;
`;

function Posteditor() {
  // const [para, setPara] = useState('');
  const dispatch = useDispatch();
  const contentInput = useRef();
  const postCheck = useSelector((state) => state.postFormReducer);
  const postData = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (postCheck.content) {
      // when content state is false
      contentInput.current && contentInput.current.focus();
      dispatch(resetCheck());
    }
  }, [postCheck.content]);

  const modules = {
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ['clean'],
    ],
  };

  const formats = [
    //'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ];

  return (
    <PostEditorWrap>
      <ReactQuill
        style={{ height: '85%', marginBottom: '6%' }}
        modules={modules}
        formats={formats}
        theme='snow'
        onChange={(content, delta, source, editor) => {
          // setPara(editor.getHTML());
          dispatch(contentAdd(editor.getHTML()));
        }}
        ref={contentInput}
        value={postData.content}
      />
    </PostEditorWrap>
  );
}

export default Posteditor;
