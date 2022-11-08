interface SignupResponseData {
  success: boolean;
  message: string;
}

export interface SignupFormData {
  userId: string;
  email: string;
  nickName: string;
  yy: string;
  mm: string;
  dd: string;
  password: string;
}

export interface AxiosResponseSignup {
  data: SignupResponseData;
}

export interface SignupValid {
  userId: boolean,
  email: boolean,
  nickName: boolean,
  password: boolean,
  check: boolean,
}