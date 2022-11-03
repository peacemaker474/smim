import { UseFormRegister, FieldError } from 'react-hook-form';
import styled from 'styled-components';
import Input from '../../common/atoms/Input';

type TitleProps = {
  register: UseFormRegister<any>;
  errors: FieldError | undefined;
};

function Title({ register, errors }: TitleProps) {
  return (
    <TitleWrap errors={errors}>
      <Input
        type="input"
        placeholder="제목"
        errors={errors}
        maxLength={25}
        name="title"
        rules={{
          required: '제목을 입력하세요',
        }}
        register={register}
        width="100%"
        height="40px"
      />
    </TitleWrap>
  );
}
export default Title;

const TitleWrap = styled.div<{ errors: FieldError | undefined }>`
  margin-top: 30px;
  & input {
    @media screen and (max-width: 612px) {
      width: 100%;
    }
    @media (min-width: 612px) {
      width: 413px;
    }
  }
`;
