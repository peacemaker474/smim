import styled from 'styled-components';
import { FieldValues, UseFormRegister, Path, RegisterOptions, FieldError } from 'react-hook-form';

type FormInputProps = {
  register: UseFormRegister<any>;
  name: Path<FieldValues>;
  rules: RegisterOptions;
  type: string;
  placeholder?: string | undefined;
  autoComplete?: string | undefined;
  maxLength?: number | undefined;
  errors?: FieldError | undefined;
  width: string;
  height: string;
  border: string;
  id?: string | undefined;
};

const CommonInput = styled.input<{ errors: FieldError | undefined; width: string; height: string; border: string }>`
  font-size: 0.8rem;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: ${({ theme, errors, border }) => (errors ? `2px solid ${theme.color.lightGray}` : border)};
  padding-left: 10px;
  border-radius: 5px;
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
  border,
  id,
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
      border={border}
      id={id}
    />
  );
}

export default Input;
