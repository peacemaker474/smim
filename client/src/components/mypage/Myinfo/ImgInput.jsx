import React, { useState } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  width: 50%;
  height: 23%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const InputFileCustom = styled.div`
  width: 80%;
  height: 45%;
  font-size: 20px;
`;

const ImgUpdateBtn = styled.label`
  display: inline-block;
  padding: 10px 20px;
  color: #999;
  vertical-align: middle;
  background-color: #fdfdfd;
  cursor: pointer;
  border: 1px solid #ebebeb;
  border-radius: 5px;
`;

const InputFile = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
  padding: 0;
`;

const InputFileValue = styled.input`
  display: inline-block;
  height: 35px;
  font-size:18px; 
  padding: 0 10px;
  vertical-align: middle;
  background-color: #f5f5f5;
  border: 1px solid #ebebeb;
  border-radius: 5px;
`;

function ImgInput ({ userInfo, setUserInfo }) {
  const [fileName, setFileName] = useState("파일선택");

  const hanldeUploadFile = (evt) => {
    const imgFiles = evt.target.files;
    setFileName(evt.target.value);
    setUserInfo({ ...userInfo, imgFiles });
  }

  const handleRemoveFile = (evt) => {
    setFileName("파일선택");
  }

  return (
    <InputWrapper>
      <InputFileCustom>
        <ImgUpdateBtn for="user-imgAdd"> 이미지 추가 </ImgUpdateBtn>
        <InputFile id="user-imgAdd" type="file" accept='image/*' onChange={hanldeUploadFile} />
        <InputFileValue value={fileName} />
      </InputFileCustom>
      <ImgUpdateBtn onClick={handleRemoveFile}> 이미지 제거 </ImgUpdateBtn>
    </InputWrapper>
  );
}

export default ImgInput;