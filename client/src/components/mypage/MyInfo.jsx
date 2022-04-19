import React, { useState } from 'react';
import styled from 'styled-components';
import NameInput from './Myinfo/NameInput';
import PwInput from './Myinfo/PwInput';
import IdInput from './Myinfo/IdInput';
import EmailInput from './Myinfo/EmailInput';
import { UpdateBtn } from '../../styles/common/buttons';

const Wrapper = styled.ul`
  width: 70%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const TextLi = styled.li`
  width: 70%;
  height: 10%;
  display: flex;
  align-items: center;
  gap: 50px;
`;

function MyInfo () {
  const [test, setTest] = useState({
    id: "admin",
    email: "test@gmail.com",
    name: "테스트"
  })

  const handleChangeInput = (evt) => {
    const name = evt.target.name;
    setTest({...test, [name]: evt.target.value});
  }

  return (
    <Wrapper>
      <TextLi>
        <IdInput test={test}/>
        <UpdateBtn> 수정 </UpdateBtn>
      </TextLi>
      <TextLi>
        <NameInput test={test} />
        <UpdateBtn> 수정 </UpdateBtn>
      </TextLi>
      <TextLi>
        <PwInput test={test} />
        <UpdateBtn> 수정 </UpdateBtn>
      </TextLi>
      <TextLi>
        <EmailInput test={test} handleChangeInput={handleChangeInput}/>
        <UpdateBtn> 수정 </UpdateBtn>
      </TextLi>
    </Wrapper>
  )
}

export default MyInfo;