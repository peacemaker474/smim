import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { putUpdateUser, putUserImage } from '../../../redux/services/UserService';
import MyInfoStyle from './MyInfo.style';

function MyInfo () {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // 유저 정보 및 메세지, 성공, 이미지 데이타 관리

  const [userInfo, setUserInfo] = useState({
    id: user.id,
    nickname: user.name,
    email: user.email,
    imgFiles: "",
    encodeImg: "",
  });
  
  const [myMessage, setMyMessage] = useState({
    id: "",
    nickname: "",
  });

  const [success, setSuccess] = useState({
    id: false,
    nickname: false,
  });

  const [fileName, setFileName] = useState("파일선택");

  // 이벰트 영역
  const handleInputChange = (evt) => {
    const name = evt.target.name;
    setUserInfo({ ...userInfo, [name]: evt.target.value});
  };

  const handleFileUpload = (evt) => {
    const imgFiles = evt.target.files;
    setFileName(evt.target.value);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      if (base64) setUserInfo({ ...userInfo, imgFiles, encodeImg: base64});
    }
    reader.readAsDataURL(imgFiles[0])
  };

  const handleFileRemove = () => {
    setFileName("파일선택");
    setUserInfo({ ...userInfo, encodeImg: ""});
  };

  const handleInfoUpdate = (evt) => {
    evt.preventDefault();

    const formdata = new FormData();
    formdata.append('email', userInfo.email);
    if (userInfo.imgFiles !== "") formdata.append('file', userInfo.imgFiles[0]);

    const lastIdCheck = userInfo.id.indexOf("\b");
    const lastNameCheck = userInfo.nickname.indexOf("\b");
    if (!(user.id === userInfo.id || user.name === userInfo.nickname) && (lastIdCheck !== 0 && lastNameCheck !== 0)) {
      formdata.append('userId', userInfo.id);
      formdata.append('nickname', userInfo.nickname);
      dispatch(putUpdateUser(formdata));
    } else {
      dispatch(putUserImage(formdata));
    }
  };

  return (
    <MyInfoStyle
      myMessage={myMessage}
      success={success}
      userInfo={userInfo}
      fileName={fileName}
      setUserInfo={setUserInfo}
      setMyMessage={setMyMessage}
      setSuccess={setSuccess}
      onInputChange={handleInputChange}
      onInfoUpdate={handleInfoUpdate}
      onFileUpload={handleFileUpload}
      onFileRemove={handleFileRemove}
    />
  )
}

export default MyInfo;