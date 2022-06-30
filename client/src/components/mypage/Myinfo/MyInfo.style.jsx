import React from 'react';
import styled from 'styled-components';
import NameInput from './InfoInput/NameInput';
import IdInput from './InfoInput/IdInput';
import EmailInput from './InfoInput/EmailInput';
import UserImage from '../../common/UserImage/UserImage';
import ImgInput from './InfoInput/ImgInput';
import { UpdateBtn } from '../../../styles/common/buttons';

const MyInfoForm = styled.form`
  width: 70%;
  height: 90%;
  display: flex;
  margin-top: 50px;
`;

const UserImageWrapper = styled.div`
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

const UserInfoWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

function MyInfoStyle ({ register, encodeImg, onSubmit, fileName, onInfoUpdate, onFileUpload, onFileRemove}) {
  return (
    <MyInfoForm method='POST' encType='multipart/form-data' onSubmit={onSubmit(onInfoUpdate)}>
      <UserImageWrapper>
        <UserImage encodeImg={encodeImg} />
        <ImgInput
          register={register}
          fileName={fileName}
          onFileUpload={onFileUpload}
          onFileRemove={onFileRemove}
        />
      </UserImageWrapper>
      <UserInfoWrapper>
        <IdInput register={register} />
        <NameInput register={register} />
        <EmailInput register={register} />
        <UpdateBtn> 수정 </UpdateBtn>
      </UserInfoWrapper>
    </MyInfoForm>
  );
}

export default MyInfoStyle;