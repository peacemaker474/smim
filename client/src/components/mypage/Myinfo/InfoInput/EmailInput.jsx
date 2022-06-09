import React from 'react';
import { MyInfoInput } from '../../../../styles/common/input';
import { InfoBox, InfoLabel } from '../../../../styles/mypage/myinfo';

function EmailInput ({userEmail}) {
  return (
    <InfoBox>
      <InfoLabel> 이메일 </InfoLabel>
      <MyInfoInput 
        name="email"
        type="email"
        placeholder='이메일'
        value={userEmail}
      />
    </InfoBox>
  );
}

export default EmailInput;