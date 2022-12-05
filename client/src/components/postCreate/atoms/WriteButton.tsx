import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MainAdd from '../../../asset/icons/icon-mail-add-fill.png';

function PostWriteBtn() {
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate('/post/create');
  };

  return (
    <BtnDiv onClick={handleBtnClick}>
      <ImgDiv />
    </BtnDiv>
  );
}

export default PostWriteBtn;

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
  @media ${({ theme }) => theme.device.ipad} {
    display: none;
  }
`;

const ImgDiv = styled.div`
  width: 40px;
  height: 40px;
  background: url(${MainAdd});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;
