import React from 'react';
import { BirthMonth, BirthYear } from '../../../styles/common/input';
import { ValidCheck } from '../../../styles/common/validtext';
import { InputBox, BirthBox } from '../../../styles/signup/container';
import { SignupTitle } from '../../../styles/signup/title';

function SignupBirthStyle ({message, onBirthYearInput, onBirthMonthInput, onBirthDayInput}) {
  return (
    <InputBox>
      <SignupTitle> 생년월일 </SignupTitle>
      <BirthBox>
        <BirthYear type="text" name="yy" onBlur={onBirthYearInput} placeholder='년(4자)' maxLength={4}/>
        <BirthMonth name="mm" onBlur={onBirthMonthInput}>
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
        <BirthYear type="text" name="dd" onBlur={onBirthDayInput} placeholder='일' maxLength={2}/>
      </BirthBox>
      {message.yy !== "" && <ValidCheck> {message.yy} </ValidCheck>}
      {message.mm !== "" && <ValidCheck> {message.mm} </ValidCheck>}
      {message.dd !== "" && <ValidCheck> {message.dd} </ValidCheck>}
    </InputBox>
  );
}

export default SignupBirthStyle;