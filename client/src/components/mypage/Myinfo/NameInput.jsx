import React from 'react';
import { MyInfoInput } from '../../../styles/common/input';


function NameInput ({userName}) {
  return (
    <MyInfoInput type="text" placeholder="닉네임" value={userName}/>
  );
}

export default NameInput;