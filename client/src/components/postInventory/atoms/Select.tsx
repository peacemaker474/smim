import styled from 'styled-components';

interface option {
  value: string;
  text: string;
}

interface SelectProps {
  color: string;
  optionArr: Array<option>;
}

const SortSelect = styled.select`
  border: 2px solid ${({ theme }) => theme.color.yellow};
  border-radius: 3px;
`;

function Select({ color, optionArr }: SelectProps) {
  return (
    <SortSelect color={color}>
      <option value="">선택</option>
      <option value="title">제목</option>
      <option value="hashtag">태그</option>
      <option value="content">내용</option>
    </SortSelect>
  );
}

export default Select;
