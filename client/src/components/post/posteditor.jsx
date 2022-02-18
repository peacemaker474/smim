import React from 'react'
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import styled from 'styled-components';

function Posteditor  () {

  const PostEditorWrap = styled.div`
    margin-top: 30px;
    height: 400px;
  `;


  const modules = {
    toolbar :[
			[{ 'header': [1, 2, false] }],
			['bold', 'italic', 'underline','strike', 'blockquote'],
			[{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
			['link', 'image'],
			[{ 'align': [] }, { 'color': [] }, { 'background': [] }],
			['clean']
    ]
  }

  return (
    <PostEditorWrap>
        <ReactQuill modules={modules} style={{ height: '85%', marginBottom: '6%' }} />
    </PostEditorWrap>
  );
}

export default Posteditor




