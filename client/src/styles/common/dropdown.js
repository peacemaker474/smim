import styled from 'styled-components';
import moreIcon from '../../asset/icon/icon-more-vertical.svg';

export const DropdownBtn = styled.div`
  width: ${({ width }) => width || '24px'};
  height: ${({ height }) => height || '24px'};
  background: url(${({ iconUrl }) => iconUrl || moreIcon});
  background-repeat: no-repeat;
  display: inline-block;
  position: relative;
  cursor: pointer;
`;

export const DropdownContainer = styled.div`
  width: ${({ width }) => width || '72px'};
  height: ${({ height }) => height || 'auto'};
  background: #ffffff;
  filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.25));
  position: absolute;
  top: 41px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  border-radius: 10px;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

export const DropdownBox = styled.div`
  padding: 5px;
  & button + button {
    margin-top: 8px;
  }
`;

export const DropdownItemBtn = styled.button`
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  border: 1px solid #ffffff;
  &:hover {
    border: 1px solid #000000;
    color: #000000;
  }
`;
