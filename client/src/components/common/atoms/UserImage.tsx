import styled from 'styled-components';

interface UserImageProps {
  width: string;
  height: string;
  encodeImg?: string;
  imgUrl: string;
}

const MyImg = styled.img<{ width: string; height: string; }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 100%;
  object-fit: contain;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.color.gray}; // 추후에 지울것
`;

function UserImage({ width, height, encodeImg, imgUrl }: UserImageProps) {
  const encoded = encodeURI(imgUrl);
  const decoded = decodeURI(encoded);

  return (
    <MyImg
      src={
        encodeImg
          ? encodeImg
          : 'https://smim-image-bucket.s3.ap-northeast-2.amazonaws.com/' + decoded
      }
      alt='user_profileImage'
      width={width}
      height={height}
    />
  );
}

export default UserImage;