import React from 'react';
import { MyInfoInput } from '../../../styles/common/input';

function IdInput ({test}) {
  return (
    <MyInfoInput type="text" placeholder="아이디" value={test.id}/>
  );
}

export default IdInput;