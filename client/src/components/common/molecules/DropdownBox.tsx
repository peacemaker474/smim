import styled from 'styled-components';
import Dropdown from '../atoms/Dropdown';
import useDropdown from '../../../hooks/useDropdown';
// import moreIcon from '../../../asset/icons/icon-more-horizontal.svg';

export default function DropdownBox() {
  const [isDropdownVisible, dropdownRef, btnRef, handleDropdownShow]: Array<any> = useDropdown();
  return (
    <PostDropdownBtnDiv ref={btnRef} onClick={handleDropdownShow}>
      <PostDropdownBtn />
      {isDropdownVisible && <Dropdown dropdownRef={dropdownRef} />}
    </PostDropdownBtnDiv>
  );
}

const PostDropdownBtnDiv = styled.div`
  position: relative;
`;

const PostDropdownBtn = styled.button`
  background-color: red;
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-size: 'contain';
`;
