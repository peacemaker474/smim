import React from 'react';
import { MyInfoInput } from '../../../../styles/common/input';
import { InfoBox, InfoLabel } from '../../../../styles/mypage/myinfo';

function EmailInput ({register}) {
  return (
    <InfoBox>
      <InfoLabel> 이메일 </InfoLabel>
      <MyInfoInput 
        {...register("email")}
        type="email"
        placeholder='이메일'
      />
    </InfoBox>
  );
}

export default React.memo(EmailInput);