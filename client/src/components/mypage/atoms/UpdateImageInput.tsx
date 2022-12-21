import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { putUserImage } from '../../../redux/services/UserService';
import { userImageToggle } from '../../../redux/slice/toggleSlice';

interface ImageInputProps {
  setEncodeImg: React.Dispatch<React.SetStateAction<any>>;
  handleFileRemove: () => void;
}

function UpdateImageInput ({ setEncodeImg, handleFileRemove }: ImageInputProps) {
  const { email } = useAppSelector((state) => state.user);
  const { accessToken } = useAppSelector((state) => state.auth);
  const [files, setFiles] = useState<FileList | null | undefined>();

  const dispatch = useAppDispatch();

  const handleFileUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const imgFiles = evt.currentTarget.files;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      if (base64) {
        setEncodeImg(base64);
        setFiles(imgFiles);
      }
    };
    if (imgFiles) reader.readAsDataURL(imgFiles[0]);
  };

  const handleImageUpdate = () => {
    const formdata = new FormData();
    formdata.append('email', email);

    if (files) {
      formdata.append('file', files[0]);
      const newData = {
        imageData: formdata,
        accessToken,
      };
      dispatch(putUserImage(newData));
      dispatch(userImageToggle());
    }
  }

  return (
    <InputFileWrapper>
      <ImageUpdateLabel htmlFor='user-imgAdd'> 🖋 변경 </ImageUpdateLabel>
      <ImageUpdateInput id='user-imgAdd' type='file' accept='image/*' onChange={handleFileUpload} />
      <ImageUpdateLabel htmlFor='user-imgSubmit'> 💾 완료 </ImageUpdateLabel>
      <ImageUpdateInput id='user-imgSubmit' type='submit' onClick={handleImageUpdate}/>
      <ImageUpdateLabel onClick={handleFileRemove}> 🗑 제거 </ImageUpdateLabel>
    </InputFileWrapper>
  );
}

export default UpdateImageInput;

const InputFileWrapper = styled.div`
  width: 90%;
  font-size: 1rem;
  display: flex;
  justify-content: space-evenly;
  gap: 5px;
  font-weight: bold;
  @media ${({ theme }) => theme.device.mobileMiddle} {
    font-size: 0.8rem;
  }
`;

const ImageUpdateLabel = styled.label`
  display: inline-block;
  padding: 10px 10px;
  color: deepskyblue;
  vertical-align: middle;
  background-color: #fdfdfd;
  cursor: pointer;
  border: 1px solid #ebebeb;
  border-radius: 5px;
`;

const ImageUpdateInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
  padding: 0;
`;