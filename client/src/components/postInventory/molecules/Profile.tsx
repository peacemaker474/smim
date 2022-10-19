import styled from 'styled-components';
import UserImage from '../../common/atoms/UserImage';

interface ProfileProps {
  width: string;
  height: string;
  imgUrl: string;
  encodeImg?: string;
  children: string;
}

const ProfileDiv = styled.div`
  display: flex;
  color: ${({ theme }) => theme.color.black};
  font-size: 12px;
  line-height: 20px;
  margin-bottom: 12px;
`;

const UserName = styled.span`
  margin-left: 6px;
`;

function Profile({ width, height, imgUrl, children, encodeImg }: ProfileProps) {
  return (
    <ProfileDiv>
      <UserImage width={width} height={height} imgUrl={imgUrl} encodeImg={encodeImg} />
      <UserName>{children}</UserName>
    </ProfileDiv>
  );
}

export default Profile;
