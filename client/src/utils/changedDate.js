export default function getDate(data) {
  var _year = data.getFullYear();
  var _month = data.getMonth() + 1;
  var _day = data.getDate();
  return `${_year}년 ${_month}월 ${_day}일`;
}
