import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { putUserImage } from '../../../redux/services/UserService';
import { userImageToggle } from '../../../redux/slice/toggleSlice';
import UpdateUserImageStyle from './UpdateUserImage.style';

function UpdateUserImage ({ imgUrl, onImageModalOpen }) {
  const { email } = useSelector((state) => state.user);
  const { accessToken } = useSelector((state) => state.authToken);
  const [encodeImg, setEncodeImg] = useState("");
  const [files, setFiles] = useState("");
  const dispatch = useDispatch();

  const handleFileUpload = (evt) => {
    const imgFiles = evt.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      if (base64) {
        setEncodeImg(base64);
        setFiles(imgFiles);
      }
    };
    reader.readAsDataURL(imgFiles[0]);
  };

  const handleFileRemove = () => {
    setEncodeImg("");
  };

  const handleImageUpdate = () => {
    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('accessToken', accessToken);
    if (files !== "") {
      formdata.append('file', files[0]);
      dispatch(putUserImage(formdata));
      dispatch(userImageToggle());
    }
  }

  return (
    <UpdateUserImageStyle
      encodeImg={encodeImg}
      imgUrl={imgUrl}
      onFileUpload={handleFileUpload}
      onFileRemove={handleFileRemove}
      onImageModalOpen={onImageModalOpen}
      onImageUpdate={handleImageUpdate}
    />
  )
}

export default UpdateUserImage;