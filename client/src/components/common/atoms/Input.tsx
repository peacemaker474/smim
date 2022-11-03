import styled from 'styled-components';
import { FieldValues, UseFormRegister, Path, RegisterOptions, FieldError } from 'react-hook-form';

type FormInputProps = {
  register: UseFormRegister<any>;
  name: Path<FieldValues>;
  rules: RegisterOptions;
  type: string;
  placeholder: string;
  autoComplete?: string | undefined;
  maxLength?: number | undefined;
  errors: FieldError | undefined;
  width: string;
  height: string;
};

const CommonInput = styled.input<{ errors: FieldError | undefined; width: string; height: string }>`
  border-radius: 5px;
  font-size: 0.8rem;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: 2px solid ${({ theme, errors }) => (errors ? theme.color.lightGray : theme.color.yellow)};
  padding-left: 10px;
  border-radius: 3px;
`;

function Input({
  register,
  name,
  rules,
  type,
  placeholder,
  autoComplete,
  maxLength,
  errors,
  width,
  height,
}: FormInputProps) {
  return (
    <CommonInput
      type={type}
      placeholder={placeholder}
      maxLength={maxLength}
      errors={errors}
      {...(register && register(name, rules))}
      autoComplete={autoComplete}
      width={width}
      height={height}
    />
  );
}

export default Input;
