export interface UserData {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  refreshToekn: string;
  success: boolean;
  imageUrl: string;
  message: string;
};

export interface LoginData {
  userId: string;
  password: string;
};

export interface UpdateUserData {
  id: string;
  name: string;
  email: string;
  success: boolean;
  message: string;
};

export interface MyData {
  userId: string;
  nickename: string;
  email: string;
  accessToken: string;
};

export interface UpdateImageData {
  success: boolean;
  message: string;
  imageUrl: string;
};

export interface ImageData {
  imageData: FormData;
  accessToken: string;
}

export interface ErrorMessage {
  success: boolean;
  message: string;
}