import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormClearErrors,
  UseFormWatch,
  UseFormSetError,
} from 'react-hook-form';
import { SignupValid, SignupFormData } from './signupTypes';

export interface UseFormTypes {
  register: UseFormRegister<any>;
  errors?: FieldError | any | undefined;
}

export interface UseFormInputProps extends UseFormTypes {
  name: Path<FieldValues>;
  rules?: RegisterOptions | undefined;
  type: string;
  placeholder?: string | undefined;
  autoComplete?: string | undefined;
  maxLength?: number | undefined;
  width: string;
  height: string;
  border: string;
  id?: string | undefined;
}

export interface UseFormSignupProps extends UseFormTypes {
  valid: SignupValid;
  setValid: React.Dispatch<React.SetStateAction<SignupValid>>;
}

export interface UseFormBirthProps extends UseFormTypes {
  getValues: UseFormGetValues<SignupFormData>;
}

export interface SignupPasswordProps extends UseFormSignupProps {
  getValues: UseFormGetValues<SignupFormData>;
}

export interface PostCreateProps extends UseFormTypes {
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
  watch: UseFormWatch<any>;
  setError: UseFormSetError<any>;
}

export interface PostCreateProps extends UseFormTypes {
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
  watch: UseFormWatch<any>;
  setError: UseFormSetError<any>;
}
