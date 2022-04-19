import React from 'react';
import { MyInfoInput } from '../../../styles/common/input';

function EmailInput ({test, handleChangeInput}) {
  return (
    <MyInfoInput name="email" type="email" placeholder='이메일' value={test.email} onChange={handleChangeInput}/>
  );
}

export default EmailInput;