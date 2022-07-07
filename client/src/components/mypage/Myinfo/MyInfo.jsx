import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { putUpdateUser } from '../../../redux/services/UserService';
import { userImageToggle } from '../../../redux/slice/toggleSlice';
import MyInfoStyle from './MyInfo.style';

function MyInfo () {
  const user = useSelector((state) => state.user);
  const { accessToken } = useSelector((state) => state.authToken);
  const { imageToggled } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: {errors} } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      id: user.id,
      nickname: user.name,
      email: user.email,
      accessToken,
    }
  });

  // 이벰트 영역

  const handleImageModalOpen = () => {
    dispatch(userImageToggle());
  }

  const handleInfoUpdate = (userInfo) => {
    const lastIdCheck = userInfo.id.indexOf('\b');
    const lastNameCheck = userInfo.nickname.indexOf('\b');
    
    if (
      !(user.id === userInfo.id || user.name === userInfo.nickname) &&
      lastIdCheck !== 0 &&
      lastNameCheck !== 0
    ) {
      dispatch(putUpdateUser(userInfo));
    }
  };

  return (
    <MyInfoStyle
      register={register}
      errors={errors}
      imageToggled={imageToggled}
      onSubmit={handleSubmit}
      onInfoUpdate={handleInfoUpdate}
      onImageModalOpen={handleImageModalOpen}
    />
  );
}

export default MyInfo;
