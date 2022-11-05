import React from 'react';
import { FieldError, FieldValues, Path, UseFormGetValues, UseFormRegister } from 'react-hook-form';

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

export interface SignupProps {
  register: UseFormRegister<any>;
  errors?: FieldError | any;
  valid: ValidValue;
  setValid: React.Dispatch<React.SetStateAction<ValidValue>>;
  getValues?: UseFormGetValues<FieldValues> | undefined;
}