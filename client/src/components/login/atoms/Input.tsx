import { FieldValues, UseFormRegister } from 'react-hook-form';
import { LoginInput } from '../../../styles/common/Input';

interface Pattern {
  value: RegExp;
  message: string;
}

interface InputProps {
  register: UseFormRegister<FieldValues>;
  name: string;
  required: string;
  pattern: Pattern;
  type: string;
  placeholder: string;
}

function Input ({ register, name, required, pattern, type, placeholder }: InputProps) {
  return (
    <LoginInput
      {...register(name, { required, pattern })} type={type} placeholder={placeholder}
    />
  );
}

export default Input;