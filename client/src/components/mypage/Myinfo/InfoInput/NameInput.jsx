import React from 'react';
import { MyInfoInput } from '../../../../styles/common/input';
import { InfoBox, InfoLabel } from '../../../../styles/mypage/myinfo';


function NameInput ({userName, onInputChange, myMessage, setMyMessage, success, setSuccess}) {
  // const handleCheckName = (evt) => {
  //   if (!nameValidation(evt.target.value)) {
  //     setMyMessage({ ...myMessage, nickname: "3~8 자리의 한글, 영문, 숫자만 가능합니다. "});
  //     setSuccess({ ...success, nickname: false});
  //   } else {
  //     getCheckMyName(evt.target.value)
  //       .then(({data}) => {
  //         setMyMessage({...myMessage, nickname: data.message});
  //         setSuccess({...success, nickname: data.success});
  //       })
  //   }
  // };

  return (
    <InfoBox>
      <InfoLabel> 닉네임 </InfoLabel>
      <MyInfoInput
        type="text"
        name="nickname"
        placeholder="닉네임"
        value={userName}
        onChange={onInputChange}
      />
    </InfoBox>
  );
}

export default NameInput;