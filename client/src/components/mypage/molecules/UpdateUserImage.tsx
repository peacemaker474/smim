import { useCallback, useState } from 'react'; 
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { userImageToggle } from '../../../redux/slice/toggleSlice';
import UserImage from '../../common/atoms/UserImage';
import UpdateImageInput from '../atoms/UpdateImageInput';

function UpdateUserImage () {
  const { imgUrl } = useAppSelector((state) => state.user);
  const [encodeImg, setEncodeImg] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleImageModal = () => {
    dispatch(userImageToggle());
  }

  const handleFileRemove = useCallback(() => {
    setEncodeImg("");
  }, []);

  return (
    <UpdateImageModalWrapper>
      <UpdateImageModalOverlay onClick={handleImageModal}/>
      <ImageModalContainer>
        <ImageCancelButton type='button' onClick={handleImageModal}> ❌ </ImageCancelButton>
        <ImageIntroduceBox>
          <ImageTilte> 프로필 사진 </ImageTilte>
          <ImageText> 자신만의 프로필 사진으로 어필을 하기 쉬워지며 내가 계정에 로그인되어 있는지 확인할 수 있습니다. </ImageText>
        </ImageIntroduceBox>
        <UserImage
          encodeImg={encodeImg}
          imgUrl={imgUrl}
          width='50%'
          height='40%'
        />
        <UpdateImageInput
          setEncodeImg={setEncodeImg}
          handleFileRemove={handleFileRemove}
        />
      </ImageModalContainer>
    </UpdateImageModalWrapper>
  );
}

export default UpdateUserImage;

const UpdateImageModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
`;

const UpdateImageModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(12, 12, 12, 0.2);
`;

const ImageModalContainer = styled.section`
  width: 40%;
  height: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  @media ${({ theme }) => theme.device.ipad} {
    width: 50%;
    height: 50%;
    justify-content: space-around;
  }
`;

const ImageIntroduceBox = styled.div`
  width: 90%;
  height: 25%;
  border-bottom: 1px solid rgba(128, 128, 128, .4);
  @media ${({ theme }) => theme.device.ipad} {
    width: 90%;
    height: 27%;
  }
`;

const ImageCancelButton = styled.button`
  all: unset;
  width: 5%;
  height: 5%;
  align-self: flex-start;
  margin-left: 1.2em;
  cursor: pointer;
  @media ${({ theme }) => theme.device.ipad} {
    width: 7%;
    height: 5%;
    margin-left: 0.9em;
    font-size: 0.8rem;
  }
`;

const ImageTilte = styled.h2`
  font-size: 1.2rem;
  padding-bottom: 1.2em;
  @media ${({ theme }) => theme.device.mobileMiddle} {
    font-size: 1rem;
  }
`;

const ImageText = styled.p`
  font-size: 0.8rem;
  line-height: 1.4em;
  word-break: keep-all;
  @media ${({ theme }) => theme.device.mobileMiddle} {
    font-size: 0.7rem;
  }
`;