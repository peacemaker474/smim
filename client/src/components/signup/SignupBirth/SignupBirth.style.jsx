import React from 'react';
import { BirthMonth, BirthYear } from '../../../styles/common/input';
import { ValidCheck } from '../../../styles/common/validtext';
import { InputBox, BirthBox } from '../../../styles/signup/container';
import { SignupTitle } from '../../../styles/signup/title';

function SignupBirthStyle ({ register, errors, onBirthYearInput, onBirthDayInput}) {
  return (
    <InputBox>
      <SignupTitle for="yy"> 생년월일 </SignupTitle>
      <BirthBox>
        <BirthYear
          id="yy"
          type="text"
          placeholder='년(4자)'
          maxLength={4}
          {...register("yy", {
            required: "태어난 연도를 입력해주세요.",
            minLength: {
              value: 4,
              message: "태어난 연도를 입력해주세요."
            },
            validate: {
              checkBirthYear: onBirthYearInput(),
            }
          })}
        />
        <BirthMonth 
          {...register("mm", {
            required: "태어난 월을 선택해주세요.",
          })}
        >
          <option value=""> 월 </option>
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
        <BirthYear
          type="text"
          placeholder='일'
          maxLength={2}
          {...register("dd", {
            required: "태어난 일을 입력해주세요.",
            validate: {
              checkBirthDay: onBirthDayInput(),
            }
          })}
        />
      </BirthBox>
      {Object.keys(errors).length !== 0 && <ValidCheck> { errors.yy?.message || errors.mm?.message || errors.dd?.message }</ValidCheck>}
    </InputBox>
  );
}

export default SignupBirthStyle;