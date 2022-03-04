
/* 4~12 자리의 영문, 숫자만 */
export const idValidation = (name) => {
  const regId = /^[a-zA-Z0-9]{4,12}$/;
  return regId.test(name);
};

/* 이메일 중복 체크 */
export const emailValidation = (email) => {
  const regEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  return regEmail.test(email);
};

/* 한글, 영어, 숫자 3~8자 */
export const nameValidation = (nickName) => {
  const regName = /^[가-힣a-zA-Z0-9]{3,8}$/;
  return regName.test(nickName);
};

/* 8~16자, 최소 하나의 숫자와 특수문자 */
export const pwValidation = (password) => {
  const regPw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  return regPw.test(password);
}