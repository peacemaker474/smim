import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';
import ReactQuill from 'react-quill';
// import { ImageResize } from 'quill-image-resize-module';
import 'react-quill/dist/quill.snow.css';
import useCreateImage from '../../../hooks/useCreateImage';
import { PostCreateProps } from '../../../type/formTypes';

// Quill.register('modules/imageResize', ImageResize);

function Editor({ register, errors, setError, setValue, watch, clearErrors }: PostCreateProps) {
  const postText = watch('para');
  const [text, setText] = useState('');
  const [img, imageHandler, quillRef] = useCreateImage();

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
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
      // imageResize: {
      //   parchment: Quill.import('parchment'),
      //   modules: ['Resize', 'DisplaySize', 'Toolbar'],
      //   image: {
      //     attribute: ['width'], // ['width', 'height']
      //     limit: {
      //       minWidth: 200,
      //       maxWidth: 800,
      //       minHeight: 200,
      //       maxHeight: 800,
      //       ratio: 0.5625, // keep width/height ratio. (ratio=height/width)
      //     },
      //   },
      // },
    }),
    [imageHandler],
  );

  const formats = [
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
    register('para.para', { required: true });
    setText(postText?.para);
  }, [register, watch, postText]);

  const { ref: registerRef } = register('para.para', { required: true });

  const handleEditorSetValue = () => {
    if ((postText.para === '' || postText.para === '<p><br></p>') && (text === '' || text === '<p><br></p>')) {
      setValue('para', { para: '', img: [] });
      setError('para.para', {
        types: {
          required: true,
        },
      });
    } else {
      if (img === '' || postText.img.includes(img)) {
        setValue('para', { para: text, img: [...postText.img] });
      } else {
        setValue('para', { para: text, img: [...postText.img, img] });
      }
      clearErrors('para');
    }
  };

  const settingRegisterRef = (ele: ReactQuill) => {
    registerRef(ele);
    quillRef.current = ele;
  };

  return (
    <PostEditorWrap errors={errors} onBlur={handleEditorSetValue}>
      <CustomReactQuill ref={settingRegisterRef} modules={modules} formats={formats} onChange={setText} value={text} />
    </PostEditorWrap>
  );
}

export default Editor;

const PostEditorWrap = styled.div<{ errors: FieldError | undefined }>`
  margin-top: 30px;
  height: 580px;
  border: 2px solid ${({ errors, theme }) => (errors ? theme.color.lightGray : theme.color.yellow)};
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
