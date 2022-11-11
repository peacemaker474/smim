import { ChangeInputWrapper } from '../../../styles/MyPageStyles';
import { UseFormTypes } from '../../../type/formTypes';
import Input from '../../common/atoms/Input';
import ValidSpan from '../../common/atoms/ValidSpan';

interface CheckNewPasswordProps extends UseFormTypes {
  handleCheckNewPwBlur: (value: string) => boolean | string;
}

function CheckNewPassword ({ register, errors, handleCheckNewPwBlur }: CheckNewPasswordProps) {
  return (
    <ChangeInputWrapper>
      <Input
        type='password'
        placeholder='새 비밀번호'
        register={register}
        name='newPassword2'
        rules={{
          validate: {
            matchesNewPassword: handleCheckNewPwBlur,
          }
        }}
        width='100%'
        height='70%'
        border='1px solid black'
      />
      { errors.newPassword2 && <ValidSpan padding='0.9em 0 0 0'> {errors.newPassword2.message} </ValidSpan>}
    </ChangeInputWrapper>
  );
}

export default CheckNewPassword;