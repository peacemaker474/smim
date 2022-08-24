export default function getDate(data) {
  const _year = data.getFullYear();
  const _month = data.getMonth() + 1;
  const _day = data.getDate();
  return `${_year}년 ${_month}월 ${_day}일`;
}
