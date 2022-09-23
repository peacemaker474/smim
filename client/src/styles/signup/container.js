import styled from 'styled-components';
import CheckSVG from '../../asset/icon/icon-check.svg';

export const CheckBox = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  right: 3%;
  transform: translateY(-50%);
  background-image: url(${CheckSVG});
`;

export const InputBox = styled.div`
  width: 100%;
  height: 14%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
`;

export const BirthBox = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-evenly;
  gap: 15px;
`;