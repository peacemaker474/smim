import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectFilter } from '../../../redux/slice/searchFilterSlice';
import { SelectBoxProps } from '../../../type/postTypes';

function SelectBox({ optionArr, name }: SelectBoxProps) {
  const { filter } = useAppSelector((state) => state.searchFilter);
  const dispatch = useAppDispatch();

  const handlePostFilter = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectFilter(evt.target.value));
  };

  return (
    <SelectDiv>
      <Select name={name} onChange={handlePostFilter} value={filter}>
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
