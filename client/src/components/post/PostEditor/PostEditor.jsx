import React, { useMemo, useEffect, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import PostEditorPresenter from './PostEditor.style';
import axios from 'axios';

function PostEditor({ register, errors, setValue, watch, clearErrors, setError }) {
  const inputRef = useRef();
  Quill.register('modules/imageResize', ImageResize);

  const imageHandler = () => {
    console.log('에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!');
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('img', file); //
      try {
        const result = await axios.post('http://localhost:4000/post/img', formData);
        const IMG_URL = result.data.url;
        const editor = inputRef.current.getEditor(); // 에디터 객체 가져오기
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', IMG_URL);
      } catch (error) {
        console.log(error);
      }
    });
  };

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
      },
    }),
    []
  );
  const paraData = watch('para');

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
    register('para', { required: true, minLength: 10 });
  }, [register]);

  const { ref } = register('para');
  console.log(inputRef);
  const onEditorStateChange = (editorState) => {
    setValue('para', editorState);
  };

  const onEditorCheckError = (range) => {
    console.log(range.index);
    if (range.index >= 10) {
      clearErrors('para');
    } else {
      setError('para', { required: true });
    }
  };

  return (
    <PostEditorPresenter
      modules={modules}
      formats={formats}
      register={register}
      errors={errors}
      setValue={setValue}
      onEditorStateChange={onEditorStateChange}
      paraData={paraData}
      onEditorCheckError={onEditorCheckError}
      registerRef={ref}
      inputRef={inputRef}
    />
  );
}

export default PostEditor;
