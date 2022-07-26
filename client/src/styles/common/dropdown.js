import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moreIcon from '../../asset/icon/icon-more-vertical.svg';

export const DropdownBtn = styled.div`
  width: ${({ width }) => width || '24px'};
  height: ${({ height }) => height || '24px'};
  background: url(${({ iconUrl }) => iconUrl || moreIcon});
  background-repeat: no-repeat;
  background-size: ${({ size }) => size || 'contain'};
`;

export const DropdownWrraper = styled.div`
  width: ${({ width }) => width || '72px'};
  height: ${({ height }) => height || 'auto'};
  background: #ffffff;
  box-shadow: 0 9px 25px rgb(0 0 0 / 15%);
  position: absolute;
  top: ${({ top }) => top || '34px'};
  left: ${({ left }) => left || '50%'};
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

export const DropdownLists = styled.ul`
  width: 100%;
  height: 100%;
  font-size: ${({ fontSize }) => fontSize || '13px'};
`;

export const DropdownList = styled.li`
  width: 100%;
  height: 50%;
  text-align: center;
  line-height: ${({ lineHeight }) => lineHeight || '40px'};
  cursor: pointer;
  &:hover {
    background-color: rgba(127, 127, 127, 0.1);
  }
`;

export const DropdownLink = styled(Link)``;
