import React from 'react';
import { MyInfoInput } from '../../../styles/common/input';
import { InfoLabel, InfoBox } from '../../../styles/mypage/myinfo';

function IdInput ({userId, handleChangeInput, myMessage, setMyMessage, success, setSuccess}) {
  // const handleCheckId = (evt) => {
  //   if (!idValidation(evt.target.value)) {
  //     setMyMessage({ ...myMessage, id: '4~12자리의 영문, 숫자만 가능합니다.'});
  //     setSuccess({ ...success, id: false });
  //   } else {
  //     checkMyId(evt.target.value)
  //       .then(({data}) => {
  //         setMyMessage({ ...myMessage, id: data.message });
  //         setSuccess({ ...success, id: data.success });
  //       })
  //   }
  // };

  return (
    <InfoBox>
      <InfoLabel> 아이디 </InfoLabel>
      <MyInfoInput
        type="text"
        name="id"
        placeholder="아이디"
        value={userId}
        onChange={handleChangeInput}
      />
    </InfoBox>
  );
}

export default IdInput;