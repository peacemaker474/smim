import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { getCheckMyId } from '../../../../network/mypage/http';
import { MyInfoInput } from '../../../../styles/common/input';
import { MyPageValid } from '../../../../styles/common/validtext';
import { InfoLabel, InfoBox } from '../../../../styles/mypage/myinfo';

function IdInput ({ register, errors }) {
  return (
    <InfoBox>
      <InfoLabel> 아이디 </InfoLabel>
      <MyInfoInput
        type="text"
        placeholder="아이디"
        {...register("id", {
          pattern: {
            value: /^[a-zA-Z0-9]{4,12}$/,
            message: "4~12자리의 영문, 숫자만 가능합니다."
          },
          validate: {
            checkExistedId : async (value) => {
              try {
                const { data } = await getCheckMyId(value);
                return data.success;
              } catch (err) {
                if (err) return `${err.response.data.message}`
              }
            }
          }
        })}
      />
      {
        errors.id &&
        <ErrorMessage
          name="id"
          errors={errors}
          render={({ message }) => <MyPageValid> {message} </MyPageValid>}
        />
      }
    </InfoBox>
  );
}

export default React.memo(IdInput);