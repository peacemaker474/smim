import React from 'react';
import { checkMyName } from '../../../network/mypage/http';
import { MyInfoInput } from '../../../styles/common/input';
import { InfoBox, InfoLabel } from '../../../styles/mypage/myinfo';
import { nameValidation } from '../../../utils/validation';


function NameInput ({userName, handleChangeInput, myMessage, setMyMessage, success, setSuccess}) {
  const handleCheckName = (evt) => {
    if (!nameValidation(evt.target.value)) {
      setMyMessage({ ...myMessage, nickname: "3~8 자리의 한글, 영문, 숫자만 가능합니다. "});
      setSuccess({ ...success, nickname: false});
    } else {
      checkMyName(evt.target.value)
        .then(({data}) => {
          setMyMessage({...myMessage, nickname: data.message});
          setSuccess({...success, nickname: data.success});
        })
    }
  };

  return (
    <InfoBox>
      <InfoLabel> 닉네임 </InfoLabel>
      <MyInfoInput
        type="text"
        name="nickname"
        placeholder="닉네임"
        value={userName}
        onChange={handleChangeInput}
        onBlur={handleCheckName}
      />
    </InfoBox>
  );
}

export default NameInput;