import { MyPageInputWrapper } from '../../../styles/MyPageStyles';
import { UseFormTypes } from '../../../type/formTypes';
import Input from '../../common/atoms/Input';
import Label from '../../common/atoms/Label';

function MyPageEmail ({ register }: UseFormTypes) {

  return (
    <MyPageInputWrapper>
      <Label
        fontSize='1rem'
        margin='0'
      >
        이메일
      </Label>
      <Input
        type='email'
        placeholder='이메일'
        register={register}
        name='email'
        width='100%'
        height='50%'
        border='1px solid black'
      />
    </MyPageInputWrapper>
  );
}

export default MyPageEmail;