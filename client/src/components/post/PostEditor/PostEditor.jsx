import React, { useEffect, useRef, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetCheck } from '../../../redux/slice/postFormCheckSlice';
import { contentAdd } from '../../../redux/slice/postCreateSlice';
import PostEditorPresenter from './PostEditor.style';

function PostEditor() {
  // const [para, setPara] = useState('');
  const dispatch = useDispatch();
  const contentInput = useRef();
  const postCheck = useSelector((state) => state.postFormCheck);
  const postData = useSelector((state) => state.postCreate);

  useEffect(() => {
    if (postCheck.content) {
      // when content state is false
      contentInput.current && contentInput.current.focus();
      dispatch(resetCheck());
    }
  }, [postCheck.content, dispatch]);

  const handleEditorWrite = (content, delta, source, editor) => {
    // setPara(editor.getHTML());
    dispatch(contentAdd(editor.getHTML()));
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        //[{ 'font': [] }],
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
        ['clean'],
      ],
    }),
    []
  );

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
    <PostEditorPresenter
      modules={modules}
      formats={formats}
      handleEditorWrite={handleEditorWrite}
      contentInput={contentInput}
      postData={postData}
    />
  );
}

export default PostEditor;
