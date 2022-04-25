import React from 'react';
import { MyInfoInput } from '../../../styles/common/input';

function EmailInput ({userEmail, handleChangeInput}) {
  return (
    <MyInfoInput name="email" type="email" placeholder='이메일' value={userEmail} onChange={handleChangeInput}/>
  );
}

export default EmailInput;