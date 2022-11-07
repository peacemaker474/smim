import React from 'react';
import { FieldError, FieldValues, UseFormGetValues, UseFormRegister } from 'react-hook-form';

export interface SignupFormData {
  userId: string;
  email: string;
  nickName: string;
  yy: string;
  mm: string;
  dd: string;
  password: string;
}

interface ResponseSignupData {
  success: boolean;
  message: string;
}

export interface ResponseSignup {
  data: ResponseSignupData;
}

interface ValidValue {
  userId: boolean,
  email: boolean,
  nickName: boolean,
  password: boolean,
  check: boolean,
}

interface UseFormProps {
  register: UseFormRegister<any>;
  errors?: FieldError | any;
}

export interface SignupProps extends UseFormProps{
  valid: ValidValue;
  setValid: React.Dispatch<React.SetStateAction<ValidValue>>;
}

export interface BirthProps extends UseFormProps {
  getValues: UseFormGetValues<SignupFormData>;
}

export interface PasswordProps extends SignupProps {
  getValues: UseFormGetValues<SignupFormData>;
}