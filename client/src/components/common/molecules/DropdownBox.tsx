import { useState, useRef } from 'react';
import styled from 'styled-components';
import useOnClickOutside from '../../../hooks/useDropdown';
import Dropdown from '../atoms/Dropdown';
import moreIcon from '../../../asset/icons/icon-more-horizontal.svg';

export default function DropdownBox() {
  const btnRef = useRef<HTMLDivElement>(null);
  // State for our modal
  const [isModalOpen, setModalOpen] = useState(false);
  useOnClickOutside(btnRef, (prev) => setModalOpen(!prev));
  return (
    <PostDropdownBtnDiv ref={btnRef} onClick={() => setModalOpen(true)}>
      <PostDropdownBtn />
      {isModalOpen && <Dropdown />}
    </PostDropdownBtnDiv>
  );
}

const PostDropdownBtnDiv = styled.div`
  position: relative;
`;

const PostDropdownBtn = styled.button`
  background: url(${moreIcon});
  width: '24px';
  height: '24px';
  background-repeat: no-repeat;
  background-size: 'contain';
`;
