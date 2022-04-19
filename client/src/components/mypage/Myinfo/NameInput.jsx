import React from 'react';
import { MyInfoInput } from '../../../styles/common/input';


function NameInput ({test}) {
  return (
    <MyInfoInput type="text" placeholder="닉네임" value={test.name}/>
  );
}

export default NameInput;