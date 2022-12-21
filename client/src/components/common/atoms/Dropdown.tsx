import styled from 'styled-components';

interface DropDownProps {
  dropdownRef: any;
  children: JSX.Element;
}

export default function DropDown({ dropdownRef, children }: DropDownProps) {
  return <DropdownWrraper ref={dropdownRef}>{children}</DropdownWrraper>;
}

const DropdownWrraper = styled.div`
  height: auto;
  width: 64px;
  background: #ffffff;
  box-shadow: 0 9px 25px rgb(0 0 0 / 15%);
  position: absolute;
  top: 25px;
  left: 50%;
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
