import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { getCheckMyName } from '../../../../network/mypage/http';
import { MyInfoInput } from '../../../../styles/common/input';
import { InfoBox, InfoLabel } from '../../../../styles/mypage/myinfo';
import { ValidCheck } from '../../../../styles/common/validtext';


function NameInput ({ register, errors }) {

  return (
    <InfoBox>
      <InfoLabel> 닉네임 </InfoLabel>
      <MyInfoInput
        type="text"
        placeholder="닉네임"
        {...register("nickname", {
          pattern: {
            value: /^[가-힣a-zA-Z0-9]{3,8}$/,
            message: "3~8 자리의 한글, 영문, 숫자만 가능합니다."
          },
          validate: {
            checkExistedName: async (value) => {
              try {
                const { data } = await getCheckMyName(value);
                return data.success;
              } catch (err) {
                if (err) return `${err.response.data.message}`;
              }
            }
          }
        })}
      />
      {
        errors.nickname &&
        <ErrorMessage 
          errors={errors}
          name="nickname"
          render={({ message }) => <ValidCheck> {message} </ValidCheck>}
        />
      }
    </InfoBox>
  );
}

export default React.memo(NameInput);