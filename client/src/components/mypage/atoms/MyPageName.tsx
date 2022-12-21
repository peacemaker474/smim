import { ErrorMessage } from '@hookform/error-message';
import { getCheckMyName } from '../../../networks/mypage/http';
import { MyPageInputWrapper } from '../../../styles/MyPageStyles';
import { UseFormTypes } from '../../../type/formTypes';
import Input from '../../common/atoms/Input';
import Label from '../../common/atoms/Label';
import ValidSpan from '../../common/atoms/ValidSpan';

function MyPageName ({ register, errors }: UseFormTypes) {

  const handleExistedName = async (value: string) => {
    try {
      const { data } = await getCheckMyName(value);
      return data.success;
    } catch (err: any) {
      if (err) return `${err.response.data.message}`
    }
  }

  return (
    <MyPageInputWrapper>
      <Label
        fontSize='1rem'
        margin='0'
      >
        닉네임
      </Label>
      <Input
        type='text'
        placeholder='닉네임'
        register={register}
        name='nickname'
        rules={{
          pattern: {
            value: /^[가-힣a-zA-Z0-9]{3,8}$/,
            message: "3~8 자리의 한글, 영문, 숫자만 가능합니다."
          },
          validate: handleExistedName
        }}
        width='100%'
        height='50%'
        border='1px solid black'
      />
      { errors.nickname &&
        <ErrorMessage
          name="nickname"
          errors={errors}
          render={({ message }) => <ValidSpan padding='0'> {message} </ValidSpan>}
        />
      }
    </MyPageInputWrapper>
  );
}

export default MyPageName;