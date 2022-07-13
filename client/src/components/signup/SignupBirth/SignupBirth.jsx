import React from 'react';
import SignupBirthStyle from './SignupBirth.style';

// 오류 메세지 출력하는 과정에서 문제가 있음

function SignupBirth ({register, errors, getValues }) {

  const handleBirthYearInput = () => (value) => {
    const myYear = value;
    const nowYear = new Date().getFullYear();
    if (nowYear - parseInt(myYear) >= 100 && myYear.length === 4) {
      return "정말이세요?";
    }
  };

  const handleBirthDayInput = () => (value) => {
    const month = parseInt(getValues("mm"));
    let day = parseInt(value);

    if (day < 1 || day > 31) {
      return "생년월일을 다시 확인해주세요.";
    }
    if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
      return "생년월일을 다시 확인해주세요.";
    }
  };

  return (
    <SignupBirthStyle
      register={register}
      errors={errors}
      onBirthYearInput={handleBirthYearInput}
      onBirthDayInput={handleBirthDayInput}
    />
  )
}

export default SignupBirth;