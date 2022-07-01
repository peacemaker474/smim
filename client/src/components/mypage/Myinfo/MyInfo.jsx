import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { putUpdateUser, putUserImage } from '../../../redux/services/UserService';
import MyInfoStyle from './MyInfo.style';

function MyInfo () {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { register, setValue, handleSubmit } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      id: user.id,
      nickname: user.name,
      email: user.email,
      imgFiles: '',
      fileName: '파일선택',
    }
  });
  const [encodeImg, setEncodeImg] = useState("");


  // 이벰트 영역
  const handleFileUpload = (evt) => {
    const imgFiles = evt.target.files;
    setValue("fileName", evt.target.value);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      if (base64) {
        setValue("imgFiles", imgFiles);
        setEncodeImg(base64);
        // setUserInfo({ ...userInfo, imgFiles, encodeImg: base64 })
      }
    };
    reader.readAsDataURL(imgFiles[0]);
  };

  const handleFileRemove = () => {
    setValue("fileName", "파일선택");
    setEncodeImg("");
  };

  const handleInfoUpdate = (userInfo) => {

    const formdata = new FormData();
    formdata.append('email', userInfo.email);
    if (userInfo.imgFiles !== '') formdata.append('file', userInfo.imgFiles[0]);

    const lastIdCheck = userInfo.id.indexOf('\b');
    const lastNameCheck = userInfo.nickname.indexOf('\b');
    
    if (
      !(user.id === userInfo.id || user.name === userInfo.nickname) &&
      lastIdCheck !== 0 &&
      lastNameCheck !== 0
    ) {
      formdata.append('userId', userInfo.id);
      formdata.append('nickname', userInfo.nickname);
      dispatch(putUpdateUser(formdata));
    } else {
      dispatch(putUserImage(formdata));
    }
  };

  return (
    <MyInfoStyle
      register={register}
      onSubmit={handleSubmit}
      encodeImg={encodeImg}
      onInfoUpdate={handleInfoUpdate}
      onFileUpload={handleFileUpload}
      onFileRemove={handleFileRemove}
    />
  );
}

export default MyInfo;
