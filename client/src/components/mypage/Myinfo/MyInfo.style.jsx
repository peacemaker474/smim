import React from 'react';
import styled from 'styled-components';
import NameInput from './InfoInput/NameInput';
import IdInput from './InfoInput/IdInput';
import EmailInput from './InfoInput/EmailInput';
import UserImage from '../../common/UserImage/UserImage';
import { UpdateBtn } from '../../../styles/common/buttons';
import UpdateUserImage from '../UpdateUserImage/UpdateUserImage';

const MyInfoForm = styled.form`
  width: 65%;
  height: 75%;
  display: flex;
  justify-content: space-around;
`;

const UserImageWrapper = styled.div`
  width: 90%;
  height: 15%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;
  &:hover {
    background-color: rgba(240, 240, 240, .4);
  }
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, .5);
  border-radius: 10px;
  margin-bottom: 10px;
`;

const UserImageTitle = React.memo(styled.h2`
  width: 10%;
  font-size: 0.9rem;
`);

const UserImageText = React.memo(styled.p`
  width: 65%;
  font-size: 0.8rem;
`);

const UserInfoWrapper = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

function MyInfoStyle ({ register, imgUrl, imageToggled, errors, onSubmit, onInfoUpdate, onImageModalOpen}) {
  return (
    <>
      <MyInfoForm method='POST' encType='multipart/form-data' onSubmit={onSubmit(onInfoUpdate)}>
        <UserInfoWrapper>
          <UserImageWrapper onClick={onImageModalOpen}>
            <UserImageTitle> 사진 </UserImageTitle>
            <UserImageText> 사진을 추가하여 계정을 맞춤설정할 수 있습니다. </UserImageText>
            <UserImage
              width={"10%"}
              height={"70%"}
              imgUrl={imgUrl}
            />
          </UserImageWrapper>
          <IdInput register={register} errors={errors} />
          <NameInput register={register} errors={errors} />
          <EmailInput register={register} />
          <UpdateBtn> 수정 </UpdateBtn>
        </UserInfoWrapper>
      </MyInfoForm>
      {imageToggled && <UpdateUserImage onImageModalOpen={onImageModalOpen} imgUrl={imgUrl}/> }
    </>
  );
}

export default MyInfoStyle;