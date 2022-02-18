import React from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {menuOpen, menuClose} from '../../redux/toggle/action';

const ToggleBtn = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  // border: 1px solid ${({theme}) => theme.color.black};
  transition: all .5s ease-in-out;
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const ToggleBurger = styled.div`
  width: 30px;
  height: 4px;
  background-color: ${({theme}) => theme.color.black};
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(255, 101, 47, .2);
  transition: all .5s ease-in-out;

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 30px;
    height: 4px;
    background-color: ${({theme}) => theme.color.black};
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(255, 101, 47, .2);
  }

  &:before {
    transform: translateY(-12px);
  }

  &:after {
    transform: translateY(12px);
  }

  ${({current}) => current && `
    transform: translateX(-30px);
    background-color: transparent;
    box-shadow: none;

    &:before {
      transform: rotate(45deg) translate(21.5px, -21.5px);
    }

    &:after {
      transform: rotate(-45deg) translate(21.5px, 21.5px);
    }
  `}

  @media screen and (max-width: 320px){
    width: 25px;
    height: 3px;

    &:before,
    &:after {
      width: 25px;
      height: 3px;
    }

    &:before {
      transform: translateY(-9px);
    }
  
    &:after {
      transform: translateY(9px);
    }

    ${({current}) => current && `
    transform: translateX(-30px);
    background-color: transparent;
    box-shadow: none;

    &:before {
      transform: rotate(45deg) translate(21.5px, -21.5px);
    }

    &:after {
      transform: rotate(-45deg) translate(21.5px, 21.5px);
    }
  `}
  }
`;

function Toggle () {
  const dispatch = useDispatch();
  const menuToggled = useSelector((state) => state.toggleReducer.menuToggled);
  const handleToggle = () => {
    if (menuToggled) {
      dispatch(menuClose());
    } else {
      dispatch(menuOpen());
    }
  }
  return (
    <>
      <ToggleBtn onClick={handleToggle}>
        <ToggleBurger current={menuToggled} />
      </ToggleBtn>
    </>
  );
}

export default Toggle;