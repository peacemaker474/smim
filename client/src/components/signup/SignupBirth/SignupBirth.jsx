import React, { useState } from 'react';
import SignupBirthStyle from './SignupBirth.style';

// 오류 메세지 출력하는 과정에서 문제가 있음

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

  const handleBirthYearInput = (evt) => {
    const name = evt.target.name;
    const myYear = evt.target.value;
    const nowYear = new Date().getFullYear();
    if (nowYear - parseInt(myYear) >= 100) {
      setMessage({ ...message, yy: "정말이세요?"});
    } else {
      setMessage({ ...message, yy: ""});
      setBirth({ ...birth, [name]: evt.target.value})
    }
  }

  const handleBirthMonthInput = (evt) => {
    const name = evt.target.name;
    if (evt.target.value === "00") {
      setMessage({ ...message, mm: "태어난 월을 선택하세요."});
    } else {
      setMessage({ ...message, mm: ""});
      setBirth({ ...birth, [name]: evt.target.value});
    }
  }

  const handleBirthDayInput = (evt) => {
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
    <SignupBirthStyle
      message={message}
      onBirthYearInput={handleBirthYearInput}
      onBirthMonthInput={handleBirthMonthInput}
      onBirthDayInput={handleBirthDayInput}
    />
  )
}

export default SignupBirth;