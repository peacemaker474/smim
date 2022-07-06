import React, { useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';
import PostEditorPresenter from './PostEditor.style';

function PostEditor({ register, errors, control }) {
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
      register={register}
      errors={errors}
      control={control}
    />
  );
}

export default PostEditor;
