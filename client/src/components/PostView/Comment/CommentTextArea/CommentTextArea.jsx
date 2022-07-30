import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

export default function CommentTextArea() {
  const [value, setValue] = useState('');
  const ref = useRef();

  const onChange = (event) => {
    const v = event.target.value;
    setValue(v);
  };

  useEffect(() => {
    // textarea scroll height 설정
    ref.current.style.height = '0px';
    const scrollHeight = ref.current.scrollHeight;
    ref.current.style.height = scrollHeight + 'px';
  }, [value]);

  return <Textarea ref={ref} value={value} onChange={onChange} />;
}

const Textarea = styled.textarea`
  min-height: 100px;
  overflow: hidden;
`;
