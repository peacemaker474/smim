export default function checkedText(text) {
  const myRegExp1 = /<IMG(.*?)>/gi;
  const imgCheck = myRegExp1.test(text);
  if (imgCheck) {
    const imgCheck = text.replace(myRegExp1, '');
    return { check: true, value: imgCheck };
  }
  return { check: false, value: text };
}
