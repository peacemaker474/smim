import React, { useCallback, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface Option {
  value: string;
  text: string;
}

interface SelectBoxProps {
  selectedValue?: string;
  optionArr: Array<Option>;
  name: string;
  setPostFilter: Dispatch<SetStateAction<string>>;
}

function SelectBox({ selectedValue, optionArr, name, setPostFilter }: SelectBoxProps) {
  const handlePostFilter = useCallback(
    (evt: React.ChangeEvent<HTMLSelectElement>) => {
      setPostFilter(evt.target.value);
    },
    [setPostFilter],
  );

  return (
    <SelectDiv>
      <Select name={name} onChange={handlePostFilter} value={selectedValue}>
        {optionArr.map((el) => (
          <option key={el.value} value={el.value}>
            {el.text}
          </option>
        ))}
      </Select>
    </SelectDiv>
  );
}

export default SelectBox;

const SelectDiv = styled.div`
  height: 35px;
  display: flex;
  @media screen and (max-width: 588px) {
    justify-content: end;
  }
`;

const Select = styled.select`
  border: 2px solid ${({ theme }) => theme.color.yellow};
  border-radius: 3px;
`;
