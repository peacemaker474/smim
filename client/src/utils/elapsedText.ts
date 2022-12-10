export const elapsedText = (createAt: string) => {
  const date = createAt ? new Date(createAt) : new Date(0);
  const seconds = 1;
  const minute = seconds * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const today = new Date();
  const elapsedTime = Math.trunc((today.getTime() - date.getTime()) / 1000);

  let elapsedText = '';
  if (elapsedTime < seconds) {
    elapsedText = '방금 전';
  } else if (elapsedTime < minute) {
    elapsedText = `${elapsedTime}초 전`;
  } else if (elapsedTime < hour) {
    elapsedText = `${Math.trunc(elapsedTime / minute)}분 전`;
  } else if (elapsedTime < day) {
    elapsedText = `${Math.trunc(elapsedTime / hour)}시간 전`;
  } else if (elapsedTime < day * 15) {
    elapsedText = `${Math.trunc(elapsedTime / day)}일 전`;
  }

  return elapsedText;
};
