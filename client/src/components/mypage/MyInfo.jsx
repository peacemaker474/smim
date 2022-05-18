import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import NameInput from './Myinfo/NameInput';
import IdInput from './Myinfo/IdInput';
import EmailInput from './Myinfo/EmailInput';
import ProfileImg from './MyProfile/ProfileImg';
import { UpdateBtn } from '../../styles/common/buttons';
import { updateUser } from '../../redux/login/action';
import ImgInput from './Myinfo/ImgInput';

const Wrapper = styled.form`
  width: 70%;
  height: 90%;
  display: flex;
  margin-top: 50px;
`;

const ImgForm = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  &:first-child {
    padding-top: 30px;
  }
  box-sizing: border-box;
`;

const InfoForm = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

function MyInfo () {
  const user = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    id: user.id,
    nickname: user.name,
    email: user.email,
    imgFiles: "",
  });
  
  const [myMessage, setMyMessage] = useState({
    id: "",
    nickname: "",
  });

  const [success, setSuccess] = useState({
    id: false,
    nickname: false,
  })

  const handleChangeInput = (evt) => {
    const name = evt.target.name;
    setUserInfo({ ...userInfo, [name]: evt.target.value});
  };

  const handleUpdateInfo = (evt) => {
    evt.preventDefault();

    const lastIdCheck = userInfo.id.indexOf("\b");
    const lastNameCheck = userInfo.nickname.indexOf("\b");
    if (lastIdCheck !== 0 && lastNameCheck !== 0) {
      const formdata = new FormData();
      formdata.append('file', userInfo.imgFiles[0]);
      formdata.append('userId', userInfo.id);
      formdata.append('nickname', userInfo.nickname);
      formdata.append('email', userInfo.email);
      
      dispatch(updateUser(formdata));
    }
  }

  return (
    <Wrapper method='POST' encType='multipart/form-data'>
      <ImgForm>
        <ProfileImg />
        <ImgInput 
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      </ImgForm>
      <InfoForm>
        <IdInput
          userId={userInfo.id}
          handleChangeInput={handleChangeInput}
          myMessage={myMessage}
          setMyMessage={setMyMessage}
          success={success}
          setSuccess={setSuccess}
        />
        <NameInput
          userName={userInfo.nickname}
          handleChangeInput={handleChangeInput}
          myMessage={myMessage}
          setMyMessage={setMyMessage}
          success={success}
          setSuccess={setSuccess}
        />
        <EmailInput 
          userEmail={userInfo.email}
        />
        <UpdateBtn type="submit" onClick={handleUpdateInfo}> 수정 </UpdateBtn>
      </InfoForm>
    </Wrapper>
  )
}

export default MyInfo;