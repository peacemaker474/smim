import React, {useState} from 'react';
import { BirthMonth, BirthYear } from '../../styles/common/input';
import { ValidCheck } from '../../styles/common/validtext';
import { InputBox, BirthBox } from '../../styles/signup/container';
import { SignupTitle } from '../../styles/signup/title';

function SignupBirth ({inputs, setInputs}) {
  const [message, setMessage] = useState({
    yy: "",
    mm: "",
    dd: "",
  });

  const [birth, setBirth] = useState({
    yy: "",
    mm: "",
  });

  const handleBirthYear = (evt) => {
    const name = evt.target.name;
    const myYear = evt.target.value;
    const nowYear = new Date().getFullYear();
    if (nowYear - parseInt(myYear) >= 100) {
      setMessage({ ...message, yy: "정말이세요?"});
    } else {
      setMessage({ ...message, yy: ""});
      setBirth({ ...birth, [name]: evt.target.value});
    }
  }

  const handleBirthMonth = (evt) => {
    const name = evt.target.name;
    if (evt.target.value === "00") {
      setMessage({ ...message, mm: "태어난 월을 선택하세요."});
    } else {
      setMessage({ ...message, mm: ""});
      setBirth({ ...birth, [name]: evt.target.value});
    }
  }

  const handleBirthDay = (evt) => {
    const month = parseInt(birth.mm);
    let day = parseInt(evt.target.value);

    if (day < 1 || day > 31) {
      setMessage({ ...message, dd: "생년월일을 다시 확인해주세요."});
    }
    if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
      setMessage({ ...message, dd: "생년월일을 다시 확인해주세요."});
    }
    if (day < 10) {
      setMessage({ ...message, dd: ""});
      setInputs({ ...inputs, birthday: birth.yy + birth.mm + `0${evt.target.value}`});
    } else {
      setMessage({ ...message, dd: ""});
      setInputs({ ...inputs, birthday: birth.yy + birth.mm + evt.target.value});
    }
  }

  return (
    <InputBox>
      <SignupTitle> 생년월일 </SignupTitle>
      <BirthBox>
        <BirthYear type="text" name="yy" onBlur={handleBirthYear} placeholder='년(4자)' maxLength={4}/>
        <BirthMonth name="mm" onBlur={handleBirthMonth}>
          <option value="00"> 월 </option>
          <option value="01"> 1 </option>
          <option value="02"> 2 </option>
          <option value="03"> 3 </option>
          <option value="04"> 4 </option>
          <option value="05"> 5 </option>
          <option value="06"> 6 </option>
          <option value="07"> 7 </option>
          <option value="08"> 8 </option>
          <option value="09"> 9 </option>
          <option value="10"> 10 </option>
          <option value="11"> 11 </option>
          <option value="12"> 12 </option>
        </BirthMonth>
        <BirthYear type="text" name="dd" onBlur={handleBirthDay} placeholder='일' maxLength={2}/>
      </BirthBox>
      {message.yy !== "" && <ValidCheck> {message.yy} </ValidCheck>}
      {message.mm !== "" && <ValidCheck> {message.mm} </ValidCheck>}
      {message.dd !== "" && <ValidCheck> {message.dd} </ValidCheck>}
    </InputBox>
  )
}

export default SignupBirth;