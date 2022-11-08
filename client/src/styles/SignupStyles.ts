import styled from 'styled-components';
import CheckSVG from '../asset/icons/icon-check.svg';

export const InputWrapper = styled.div`
  width: 100%;
  height: 14%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;

  label {
    align-self: flex-start;
  }
`;

export const CheckBox = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  right: 3%;
  transform: translateY(-50%);
  background-image: url(${CheckSVG});
`;