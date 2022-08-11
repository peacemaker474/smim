import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setRefreshToken = (name, value) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);


  return cookies.set(name, value, {
    sameSite: 'strict',
    path: "/",
    secure: true,
    expires: new Date(expireDate),
  })
}

export const getCookie = () => {
  const name = "users";
  
  return cookies.get(name);
}

export const deleteCookie = (name) => {
  return cookies.remove(name);
}