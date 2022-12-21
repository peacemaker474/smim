import { memo } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector, useAppSelectorTyped } from '../../../redux/hooks';
import { putUpdateUser } from '../../../redux/services/UserService';
import { userImageToggle } from '../../../redux/slice/toggleSlice';
import Button from '../../common/atoms/Button';
import UserImage from '../../common/atoms/UserImage';
import MyPageEmail from '../atoms/MyPageEmail';
import MyPageId from '../atoms/MyPageId';
import MyPageName from '../atoms/MyPageName';
import UpdateUserImage from './UpdateUserImage';

interface UseFormMyPage {
  userId: string;
  nickname: string;
  email: string;
  accessToken?: string | null | undefined;
}

function MyInfo() {
  const {
    id,
    name: nickname,
    email,
    imgUrl,
  } = useAppSelectorTyped((state) => ({
    id: state.user.id,
    name: state.user.name,
    email: state.user.email,
    imgUrl: state.user.imgUrl,
  }));

  const { accessToken } = useAppSelector((state) => state.auth);
  const { imageToggled } = useAppSelector((state) => state.toggle);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UseFormMyPage>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      userId: id,
      nickname,
      email,
      accessToken,
    },
  });

  const dispatch = useAppDispatch();

  const handleImageModal = () => {
    dispatch(userImageToggle());
  };

  const handleInfoUpdate = (userInfo: any) => {
    const lastIdCheck = userInfo.userId.indexOf('\b');
    const lastNameCheck = userInfo.nickname.indexOf('\b');

    if (!(id === userInfo.userId || nickname === userInfo.nickname) && lastIdCheck && lastNameCheck) {
      dispatch(putUpdateUser(userInfo));
    }
  };

  return (
    <>
      <MyInfoForm method="POST" encType="multipart/form-data" onSubmit={handleSubmit(handleInfoUpdate)}>
        <UserInfoWrapper>
          <UserImageWrapper onClick={handleImageModal}>
            <UserImageTitle> 사진 </UserImageTitle>
            <UserImageText> 사진을 추가하여 계정을 맞춤설정할 수 있습니다. </UserImageText>
            <UserImage width="40px" height="40px" imgUrl={imgUrl} />
          </UserImageWrapper>
          <MyPageId register={register} errors={errors} />
          <MyPageName register={register} errors={errors} />
          <MyPageEmail register={register} />
          <Button width="100px" height="50px" border="none">
            수정
          </Button>
        </UserInfoWrapper>
      </MyInfoForm>
      {imageToggled && <UpdateUserImage />}
    </>
  );
}

export default MyInfo;

const MyInfoForm = styled.form`
  width: 70%;
  height: 75%;
  display: flex;
  justify-content: space-around;

  button {
    align-self: flex-end;
    margin-right: 20px;
  }

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
    background-color: rgba(240, 240, 240, 0.4);
  }
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin-bottom: 10px;
`;

const UserImageTitle = memo(styled.h2`
  width: 10%;
  font-size: 0.9rem;
  text-align: end;
  font-weight: bold;
  @media screen and (max-width: 769px) {
    width: 0%;
    opacity: 0;
  }
`);

const UserImageText = memo(styled.p`
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
