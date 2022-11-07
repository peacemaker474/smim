import { useState, useRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormClearErrors,
  UseFormWatch,
  // UseFormSetError,
  //   FieldError,
} from 'react-hook-form';
import ReactQuill from 'react-quill';
// import  { Quill } from 'react-quill';
// import ImageResize from 'quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

// Quill.register('modules/imageResize', ImageResize);

interface EditorProps {
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
  watch: UseFormWatch<any>;
  // setError: UseFormSetError<any>;
  register: UseFormRegister<any>;
  //   errors: FieldError | undefined;
}

function Editor({
  register,
  // errors,
  // setError,
  setValue,
  watch,
  clearErrors,
}: EditorProps) {
  const postText = watch('para');
  const quillRef = useRef<ReactQuill>();
  const [text, setText] = useState('');
  const [img, setImg] = useState('');

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      const file = input.files;
      if (file !== null) {
        const formData = new FormData();
        formData.append('img', file[0]);
        try {
          const result = await axios.post(`https://httpstest.smimsv.ga/post/img`, formData);
          console.log(result);
          const { url } = result.data;
          setImg(result.data.key);
          const range = quillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            const quill = quillRef.current?.getEditor();

            quill?.setSelection(range, 1);

            quill?.clipboard.dangerouslyPasteHTML(range, `<img src=${url} alt="이미지 태그가 삽입됩니다." />`);
          }

          return;
        } catch (error) {
          console.log(error);
        }
      }
    });
  }, [setImg]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          // [{ 'font': [] }],
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
      //   imageResize: {
      //     parchment: Quill.import('parchment'),
      //     modules: ['Resize', 'DisplaySize', 'Toolbar'],
      //     image: {
      //       attribute: ['width'], // ['width', 'height']
      //       limit: {
      //         minWidth: 200,
      //         maxWidth: 800,
      //         minHeight: 200,
      //         maxHeight: 800,
      //         ratio: 0.5625, // keep width/height ratio. (ratio=height/width)
      //       },
      //     },
      //   },
    }),
    [imageHandler],
  );

  const formats = [
    // 'font',
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

  //   useEffect(() => {
  //     register('para.p', { required: true });
  //     setText(postText.para);
  //   }, [register, watch, postText]);

  const { ref: registerRef } = register('para.p', { required: true });

  const handleEditorStateChange = (editorState: any) => {
    setText(editorState);
  };

  const handleEditorSetValue = () => {
    if ((postText.para === '' || postText.para === '<p><br></p>') && (text === '' || text === '<p><br></p>')) {
      setValue('para', { p: '', img: [] });
      //   setError('para.para', { required: true });
    } else {
      if (img === '' || postText.img.includes(img)) {
        setValue('para', { p: text, img: [...postText.img] });
      } else {
        setValue('para', { p: text, img: [...postText.img, img] });
      }
      clearErrors('para');
    }
  };

  const settingRegisterRef = (ele: any) => {
    registerRef(ele);
    quillRef.current = ele;
  };
  return (
    <PostEditorWrap
      //   errors={errors.para}
      onBlur={handleEditorSetValue}
    >
      <CustomReactQuill
        ref={settingRegisterRef}
        modules={modules}
        formats={formats}
        onChange={handleEditorStateChange}
        value={text}
      />
    </PostEditorWrap>
  );
}

export default Editor;

// const PostEditorWrap = styled.div<{ errors: FieldError | undefined }>`
//   margin-top: 30px;
//   height: 580px;
//   border: 2px solid ${({ errors, theme }) => (errors ? theme.color.lightGray : theme.color.yellow)};
//   @media screen and (max-width: 550px) {
//     height: 602px;
//   }
// `;

const PostEditorWrap = styled.div`
  margin-top: 30px;
  height: 580px;
  border: 2px solid ${({ theme }) => theme.color.yellow};
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
