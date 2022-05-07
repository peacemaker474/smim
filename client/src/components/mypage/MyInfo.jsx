import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import NameInput from './Myinfo/NameInput';
import IdInput from './Myinfo/IdInput';
import EmailInput from './Myinfo/EmailInput';
import { UpdateBtn } from '../../styles/common/buttons';

const InfoForm = styled.form`
  width: 70%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

function MyInfo () {
  const user = useSelector((state) => state.loginReducer);
  const [userInfo, setUserInfo] = useState({
    id: user.id,
    nickname: user.name,
    email: user.email,
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
  }

  return (
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
      <UpdateBtn onClick={handleUpdateInfo}> 수정 </UpdateBtn>
    </InfoForm>
  )
}

export default MyInfo;