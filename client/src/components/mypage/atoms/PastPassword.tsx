import { ChangeInputWrapper } from '../../../styles/MyPageStyles';
import { UseFormTypes } from '../../../type/formTypes';
import Input from '../../common/atoms/Input';
import ValidSpan from '../../common/atoms/ValidSpan';

function PastPassword ({ register, errors }: UseFormTypes) {
  return (
    <ChangeInputWrapper>
      <Input
        type='password'
        placeholder='현재 비밀번호'
        register={register}
        name='oldPassword'
        rules={{
          pattern: {
            value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
            message: "8~16자, 최소 하나의 숫자와 특수문자가 필요합니다."
          }
        }}
        width='100%'
        height='70%'
        border='1px solid black'
      />
      { errors.oldPassword && <ValidSpan padding='0.9em 0 0 0'> {errors.oldPassword.message} </ValidSpan>}
    </ChangeInputWrapper>
  );
}

export default PastPassword;