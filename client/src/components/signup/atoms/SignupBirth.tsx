import styled from 'styled-components';
import ValidSpan from '../../common/atoms/ValidSpan';
import { BirthProps } from '../types';

function SignupBirth ({ register, errors, getValues }: BirthProps) {
  const handleBirthYearInput = () => (value: string) => {
    const myYear = value;
    const nowYear = new Date().getFullYear();
    if (nowYear - +myYear >= 100 && myYear.length === 4) {
      return '정말이세요?';
    }
  };

  const handleBirthDayInput = () => (value: string) => {
    const month = +getValues('mm');
    const day = +value;

    if (day < 1 || day > 31) {
      return '생년월일을 다시 확인해주세요.';
    }
    if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
      return '생년월일을 다시 확인해주세요.';
    }
  };
  
  return (
    <InputWrapper>
      <SignupTitle htmlFor='yy'> 생년월일 </SignupTitle>
      <BirthBox>
        <BirthYear
          id='yy'
          type='text'
          placeholder='년(4자)'
          maxLength={4}
          {...register('yy', {
            required: '태어난 연도를 입력해주세요.',
            minLength: {
              value: 4,
              message: '태어난 연도를 입력해주세요.'
            },
            validate: {
              checkBirthYear: handleBirthYearInput(),
            }
          })}
        />
        <BirthMonth 
          {...register('mm', {
            required: '태어난 월을 선택해주세요.',
          })}
        >
          <option value=''> 월 </option>
          <option value='01'> 1 </option>
          <option value='02'> 2 </option>
          <option value='03'> 3 </option>
          <option value='04'> 4 </option>
          <option value='05'> 5 </option>
          <option value='06'> 6 </option>
          <option value='07'> 7 </option>
          <option value='08'> 8 </option>
          <option value='09'> 9 </option>
          <option value='10'> 10 </option>
          <option value='11'> 11 </option>
          <option value='12'> 12 </option>
        </BirthMonth>
        <BirthYear
          type='text'
          placeholder='일'
          maxLength={2}
          {...register('dd', {
            required: '태어난 일을 입력해주세요.',
            validate: {
              checkBirthDay: handleBirthDayInput(),
            }
          })}
        />
      </BirthBox>
      {Object.keys(errors).length !== 0 && <ValidSpan padding='1em 0.2em 0 0'> { errors.yy?.message || errors.mm?.message || errors.dd?.message }</ValidSpan>}
    </InputWrapper>
  );
}

export default SignupBirth;

const InputWrapper = styled.div`
  width: 100%;
  height: 14%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
`;

export const BirthBox = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-evenly;
  gap: 15px;
`;

const SignupTitle = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 5px 3px;
  align-self: flex-start;
`

export const BirthYear = styled.input`
  all: unset;
  width: 30%;
  height: 45px;
  border: 2px solid ${({ theme }) => theme.color.yellow};
  padding-left: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  @media ${({ theme }) => theme.device.ipad} {
    height: 90%;
    font-size: 0.8rem;
  }
  @media ${({ theme }) => theme.device.mobileMiddle} {
    font-size: 0.7rem;
    padding-left: 10px;
  }
`;

export const BirthMonth = styled.select`
  all: unset;
  width: 30%;
  height: 45px;
  line-height: 1em;
  border: 2px solid ${({ theme }) => theme.color.yellow};
  padding: 12px 0 0 10px;
  box-sizing: border-box;
  border-radius: 5px;
  @media ${({ theme }) => theme.device.ipad} {
    height: 90%;
    font-size: 0.8rem;
  }
  @media ${({ theme }) => theme.device.mobileMiddle} {
    font-size: 0.7rem;
    padding-left: 10px;
  }
`;