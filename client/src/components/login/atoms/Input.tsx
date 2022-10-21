import { FieldValues, UseFormRegister, Path, RegisterOptions } from 'react-hook-form';
import { LoginInput } from '../../../styles/common/Input';

type FormInputProps = {
  register: UseFormRegister<any>;
  name: Path<FieldValues>;
  rules: RegisterOptions;
  type: string;
  placeholder: string;
  autoComplete?: string | undefined;
};

function Input ({ register, name, rules, type, placeholder, autoComplete }: FormInputProps) {
  return (
    <LoginInput
      type={type}
      placeholder={placeholder}
      {...(register && register(name, rules))}
      autoComplete={autoComplete}
    />
  );
}

export default Input;