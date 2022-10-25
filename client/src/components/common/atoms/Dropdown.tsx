import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function DropDown() {
  return (
    <DropdownWrraper>
      <DropdownLists>
        <DropdownList>
          <DropdownLink to="post/edit/123"> 수정</DropdownLink>
        </DropdownList>
        <DropdownList>삭제</DropdownList>
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
