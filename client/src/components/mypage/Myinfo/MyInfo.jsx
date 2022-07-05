import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { putUpdateUser, putUserImage } from '../../../redux/services/UserService';
import { userImageToggle } from '../../../redux/slice/toggleSlice';
import MyInfoStyle from './MyInfo.style';

function MyInfo () {
  const user = useSelector((state) => state.user);
  const [encodeImg, setEncodeImg] = useState("");
  const [files, setFiles] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: {errors} } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      id: user.id,
      nickname: user.name,
      email: user.email,
    }
  });

  // 이벰트 영역
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

  const handleImageModalOpen = () => {
    dispatch(userImageToggle());
  }

  const handleFileRemove = () => {
    setEncodeImg("");
  };

  const handleImageUpdate = () => {
    const formdata = new FormData();
    formdata.append('email', user.email);
    if (files !== "") {
      formdata.append('file', files[0]);
      dispatch(putUserImage(formdata));
      dispatch(userImageToggle());
    }
  }

  const handleInfoUpdate = (userInfo) => {
    const lastIdCheck = userInfo.id.indexOf('\b');
    const lastNameCheck = userInfo.nickname.indexOf('\b');
    
    if (
      !(user.id === userInfo.id || user.name === userInfo.nickname) &&
      lastIdCheck !== 0 &&
      lastNameCheck !== 0
    ) {
      let body = {
        userId: userInfo.id,
        nickname: userInfo.nickname,
        email: userInfo.email,
      }
      dispatch(putUpdateUser(body));
    }
  };

  return (
    <MyInfoStyle
      register={register}
      onSubmit={handleSubmit}
      errors={errors}
      encodeImg={encodeImg}
      onInfoUpdate={handleInfoUpdate}
      onFileUpload={handleFileUpload}
      onFileRemove={handleFileRemove}
      onImageModalOpen={handleImageModalOpen}
      onImageUpdate={handleImageUpdate}
    />
  );
}

export default MyInfo;
