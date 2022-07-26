import React, { useMemo, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import PostEditorPresenter from './PostEditor.style';

function PostEditor({ register, errors, setValue, watch, clearErrors, setError }) {
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
    />
  );
}

export default PostEditor;
