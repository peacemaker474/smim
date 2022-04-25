import React from 'react';
import { MyInfoInput } from '../../../styles/common/input';

function IdInput ({userId}) {
  return (
    <MyInfoInput type="text" placeholder="아이디" value={userId}/>
  );
}

export default IdInput;