import styled from 'styled-components';
import Dropdown from '../atoms/Dropdown';
import { useDropdown } from '../../../hooks';
import moreIcon from '../../../asset/icons/icon-more-horizontal.svg';

interface DropdownBoxProps {
  children: JSX.Element;
}

export default function DropdownBox({ children }: DropdownBoxProps) {
  const [isDropdownVisible, dropdownRef, btnRef, handleDropdownShow]: Array<any> = useDropdown();
  return (
    <PostDropdownBtnDiv ref={btnRef} onClick={handleDropdownShow}>
      <PostDropdownBtn />
      {isDropdownVisible && <Dropdown dropdownRef={dropdownRef}>{children}</Dropdown>}
    </PostDropdownBtnDiv>
  );
}

const PostDropdownBtnDiv = styled.div`
  position: relative;
`;

const PostDropdownBtn = styled.button`
  background: url(${moreIcon});
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-size: 'contain';
`;
