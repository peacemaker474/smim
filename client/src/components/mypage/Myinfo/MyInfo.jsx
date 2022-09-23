import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { putUpdateUser } from '../../../redux/services/UserService';
import { userImageToggle } from '../../../redux/slice/toggleSlice';
import MyInfoStyle from './MyInfo.style';

function MyInfo() {
  const {
    id,
    name: nickname,
    email,
    imgUrl,
  } = useSelector(
    (state) => ({
      id: state.user.id,
      name: state.user.name,
      email: state.user.email,
      imgUrl: state.user.imgUrl,
    }),
    shallowEqual
  );
  const { accessToken } = useSelector((state) => state.authToken);
  const { imageToggled } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      userId: id,
      nickname,
      email,
      accessToken,
    },
  });

  const handleImageModalOpen = useCallback(() => {
    dispatch(userImageToggle());
  }, [dispatch]);

  const handleInfoUpdate = useCallback(
    (userInfo) => {
      const lastIdCheck = userInfo.userId.indexOf('\b');
      const lastNameCheck = userInfo.nickname.indexOf('\b');

      if (
        !(id === userInfo.userId || nickname === userInfo.nickname) &&
        lastIdCheck !== 0 &&
        lastNameCheck !== 0
      ) {
        dispatch(putUpdateUser(userInfo));
      }
    },
    [dispatch, id, nickname]
  );

  return (
    <MyInfoStyle
      register={register}
      errors={errors}
      imgUrl={imgUrl}
      imageToggled={imageToggled}
      onSubmit={handleSubmit}
      onInfoUpdate={handleInfoUpdate}
      onImageModalOpen={handleImageModalOpen}
    />
  );
}

export default MyInfo;
