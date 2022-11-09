import { ErrorMessage } from '@hookform/error-message';
import { getCheckMyId } from '../../../networks/mypage/http';
import { MyPageInputWrapper } from '../../../styles/MyPageStyles';
import { UseFormTypes } from '../../../type/formTypes';
import Input from '../../common/atoms/Input';
import Label from '../../common/atoms/Label';
import ValidSpan from '../../common/atoms/ValidSpan';

function MyPageId ({ register, errors }: UseFormTypes) {

  const handleExistedId = async (value: string) => {
    try {
      const { data } = await getCheckMyId(value);
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
        아이디 
      </Label>
      <Input
        type='text'
        placeholder='아이디'
        register={register}
        name='userId'
        rules={{
          pattern: {
            value: /^[a-zA-Z0-9]{4,12}$/,
            message: "4~12자리의 영문, 숫자만 가능합니다."
          },
          validate: handleExistedId
        }}
        width='100%'
        height='50%'
        border='1px solid black'
      />
      { errors.userId &&
        <ErrorMessage
          name='userId'
          errors={errors}
          render={({ message }) => <ValidSpan padding='0'> {message} </ValidSpan>}
        />
      }
    </MyPageInputWrapper>
  );
}

export default MyPageId;