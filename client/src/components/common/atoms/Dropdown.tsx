import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { modalToggle } from '../../../redux/slice/toggleSlice';

interface DropDownProps {
  dropdownRef: any;
}

export default function DropDown({ dropdownRef }: DropDownProps) {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const handleModalShow = () => {
    dispatch(modalToggle());
  };

  return (
    <DropdownWrraper ref={dropdownRef}>
      <DropdownLists>
        <DropdownList>
          <DropdownLink to={`/post/edit/${id}`}>수정</DropdownLink>
        </DropdownList>
        <DropdownList onClick={handleModalShow}>삭제</DropdownList>
      </DropdownLists>
    </DropdownWrraper>
  );
}

const DropdownWrraper = styled.div`
  height: auto;
  width: 64px;
  background: #ffffff;
  box-shadow: 0 9px 25px rgb(0 0 0 / 15%);
  position: absolute;
  top: 27px;
  left: '50%';
  transform: translateX(-50%);
  z-index: 2;
  border-radius: 9px;
  overflow: hidden;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const DropdownLists = styled.ul`
  width: 100%;
  height: 100%;
  font-size: '13px';
`;

const DropdownList = styled.li`
  width: 100%;
  height: 50%;
  text-align: center;
  line-height: 34px;
  cursor: pointer;
  &:hover {
    background-color: rgba(127, 127, 127, 0.1);
  }
`;

const DropdownLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: inline-block;
`;
