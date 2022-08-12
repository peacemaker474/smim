export default function checkedText(text) {
  const myRegExp2 = /<p(.*?)>|<\/p>/gi;
  const myRegExp1 = /<IMG(.*?)>/gi;
  const check1 = text.replace(myRegExp2, '');
  if (check1.search(myRegExp1) === 0) {
    return '<p>[이미지]</p>';
  }
  return text;
}
