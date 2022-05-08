import React from 'react';
import styled from 'styled-components';
import MainAdd from '../../asset/icon/icon-mail-add-fill.png';
import { useNavigate } from 'react-router-dom';

const BtnDiv = styled.div`
  position: fixed;
  bottom: 35px;
  right: 35px;
  padding: 10px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.color.yellow};
  cursor: pointer;
  background: #fff;
  z-index: 2;
`;

const ImgDiv = styled.div`
  width: 40px;
  height: 40px;
  background: url(${MainAdd});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

function WriteBtn() {
  const navigate = useNavigate();
  const handleBtnClick = () => {
    navigate('/posts/create');
  };
  return (
    <BtnDiv onClick={handleBtnClick}>
      <ImgDiv></ImgDiv>
    </BtnDiv>
  );
}

export default WriteBtn;
