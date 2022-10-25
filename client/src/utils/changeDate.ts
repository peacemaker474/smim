export default function getDate(updateAt: string) {
  const data = new Date(updateAt);

  const year = data.getFullYear();
  const month = data.getMonth() + 1;
  const day = data.getDate();

  return `${year}년 ${month}월 ${day}일`;
}
