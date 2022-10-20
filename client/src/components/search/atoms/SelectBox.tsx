import React from 'react';
import styled from 'styled-components';

interface Option {
  value: string;
  text: string;
}

interface SelectBoxProps {
  onChange: (e: React.ChangeEvent) => {};
  selectedValue?: string;
  optionArr: Array<Option>;
  name: string;
}

const Select = styled.select`
  border: 2px solid ${({ theme }) => theme.color.yellow};
  border-radius: 3px;
`;

function SelectBox({ onChange, selectedValue, optionArr, name }: SelectBoxProps) {
  return (
    <Select name={name} onChange={onChange} value={selectedValue}>
      {optionArr.map((el) => (
        <option value={el.value}>{el.text}</option>
      ))}
    </Select>
  );
}

export default SelectBox;
