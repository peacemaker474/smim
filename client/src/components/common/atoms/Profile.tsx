import styled from 'styled-components';
import UserImage from './UserImage';

interface ProfileProps {
  width: string;
  height: string;
  imgUrl: string;
  children: string;
}

function Profile({ width, height, imgUrl, children }: ProfileProps) {
  return (
    <ProfileDiv>
      <UserImage width={width} height={height} imgUrl={imgUrl} />
      <UserName>{children}</UserName>
    </ProfileDiv>
  );
}

export default Profile;

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
