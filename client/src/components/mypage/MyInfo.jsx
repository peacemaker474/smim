import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import NameInput from './Myinfo/NameInput';
import PwInput from './Myinfo/PwInput';
import IdInput from './Myinfo/IdInput';
import EmailInput from './Myinfo/EmailInput';
import { UpdateBtn } from '../../styles/common/buttons';

const InfoLists = styled.ul`
  width: 70%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const InfoList = styled.li`
  width: 70%;
  height: 10%;
  display: flex;
  align-items: center;
  gap: 50px;
`;

function MyInfo () {
  const user = useSelector((state) => state.loginReducer);

  const handleChangeInput = (evt) => {
    const name = evt.target.name;
    console.log(name);
  };

  return (
    <InfoLists>
      <InfoList>
        <IdInput userId={user.id}/>
        <UpdateBtn> 수정 </UpdateBtn>
      </InfoList>
      <InfoList>
        <NameInput userName={user.name} />
        <UpdateBtn> 수정 </UpdateBtn>
      </InfoList>
      <InfoList>
        <PwInput />
        <UpdateBtn> 수정 </UpdateBtn>
      </InfoList>
      <InfoList>
        <EmailInput userEmail={user.email} handleChangeInput={handleChangeInput}/>
        <UpdateBtn> 수정 </UpdateBtn>
      </InfoList>
    </InfoLists>
  )
}

export default MyInfo;