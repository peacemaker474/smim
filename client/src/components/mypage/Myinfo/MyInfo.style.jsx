import React from 'react';
import styled from 'styled-components';
import NameInput from './InfoInput/NameInput';
import IdInput from './InfoInput/IdInput';
import EmailInput from './InfoInput/EmailInput';
import UserImage from '../../common/UserImage/UserImage';
import { UpdateBtn } from '../../../styles/common/buttons';
import UpdateUserImage from '../UpdateUserImage/UpdateUserImage';

const MyInfoForm = styled.form`
  width: 70%;
  height: 75%;
  display: flex;
  justify-content: space-around;

  @media screen and (max-width: 1180px) {
    width: 90%;
    height: 80%;
  }

  @media screen and (max-width: 769px) {
    height: 50%;
  }

  @media screen and (max-width: 380px) {
    width: 100%;
  }

  @media screen and (max-height: 796px) {
    height: 80%;
  }
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
  text-align: end;
  font-weight: bold;

  @media screen and (max-width: 769px) {
    width: 0%;
    opacity: 0;
  }
`);

const UserImageText = React.memo(styled.p`
  width: 75%;
  font-size: 0.8rem;
  text-align: center;

  @media screen and (max-width: 769px) {
    width: 80%;
    font-size: 0.8rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 0.7rem;
  }
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
              width={"40px"}
              height={"40px"}
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