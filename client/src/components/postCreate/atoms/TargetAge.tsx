import { UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';

type TargetAgeProps = {
  register: UseFormRegister<any>;
};

function TargetAge({ register }: TargetAgeProps) {
  return (
    <TargetWrap>
      <TargetAgeSelect error={false} {...register('age', { required: 'This is required' })}>
        <option value="">질문하고 싶은 연령층을 선택해주세요.</option>
        <option value="10">10대에게</option>
        <option value="20">20대에게</option>
        <option value="30">30대에게</option>
        <option value="40">40대에게</option>
        <option value="50">50대이상에게</option>
      </TargetAgeSelect>
    </TargetWrap>
  );
}
export default TargetAge;

const TargetWrap = styled.div`
  margin-top: 30px;
`;

const TargetAgeSelect = styled.select<{ error: boolean }>`
  width: 250px;
  height: 40px;
  border: 2px solid ${({ error, theme }) => (error ? theme.color.lightGray : theme.color.yellow)};
  border-radius: 3px;
  @media screen and (max-width: 550px) {
    width: 100%;
    & > option {
      width: 100%;
    }
  }
`;
