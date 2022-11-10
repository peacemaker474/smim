import { useState, useRef, useCallback } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';

function useCreateImage() {
  const [img, setImg] = useState('');
  const quillRef = useRef<ReactQuill>();

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
  return [img, imageHandler, quillRef] as const;
}

export default useCreateImage;
