import React, { useMemo, useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import PostEditorPresenter from './PostEditor.style';
import axios from 'axios';

Quill.register('modules/imageResize', ImageResize);

function PostEditor({ register, errors, setValue, watch, clearErrors, setError }) {
  const postText = watch('para');
  const quillRef = useRef();
  const [text, setText] = useState('');

  function imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('img', file);
      try {
        const result = await axios.post('http://localhost:4000/post/img', formData);
        const url = result.data.url;
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection()?.index;
        if (typeof range !== 'number') return;
        quill.setSelection(range, 1);
        quill.clipboard.dangerouslyPasteHTML(range, `<img src=${url} alt="image" />`);
      } catch (error) {
        console.log(error);
      }
    });
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          //[{ 'font': [] }],
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
        image: {
          attribute: ['width'], // ['width', 'height']
          limit: {
            minWidth: 200,
            maxWidth: 800,
            minHeight: 200,
            maxHeight: 800,
            ratio: 0.5625, // keep width/height ratio. (ratio=height/width)
          },
        },
      },
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

  useEffect(() => {
    register('para', { required: true });
    setText(postText);
  }, [register, watch, postText]);

  const { ref: registerRef } = register('para', { required: true });

  const handleEditorStateChange = (editorState) => {
    setText(editorState);
  };

  const handleEditorSetValue = () => {
    if (text === '<p><br></p>') {
      setValue('para', '');
      setError('para', { required: true });
    } else {
      clearErrors('para');
      setValue('para', text);
    }
  };

  const settingRegisterRef = (e) => {
    registerRef(e);
    quillRef.current = e;
  };

  return (
    <PostEditorPresenter
      modules={modules}
      formats={formats}
      onEditorStateChange={handleEditorStateChange}
      settingRegisterRef={settingRegisterRef}
      errors={errors}
      text={text}
      onEditorSetValue={handleEditorSetValue}
    />
  );
}

export default PostEditor;
