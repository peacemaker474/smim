import { UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';

type TitleProps = {
  register: UseFormRegister<any>;
};

function Title({ register }: TitleProps) {
  return (
    <TitleWrap>
      <TitleInput
        placeholder="제목"
        error={false}
        maxLength={25}
        {...register('title', { required: 'This is required' })}
      />
    </TitleWrap>
  );
}
export default Title;

const TitleWrap = styled.div`
  margin-top: 30px;
`;

const TitleInput = styled.input<{ error: boolean }>`
  height: 40px;
  border: 2px solid ${({ theme, error }) => (error ? theme.color.lightGray : theme.color.yellow)};
  border-radius: 3px;
  @media screen and (max-width: 612px) {
    width: 100%;
  }
  @media (min-width: 612px) {
    width: 413px;
  }
`;
