import styled from 'styled-components';
import heartFill from '../../../asset/icons/icon-heart-fill.svg';

interface PostContentProps {
  nickname: string;
  createAt: string;
  likes: number;
}

function PostContent ({ nickname, createAt, likes }: PostContentProps) {
  return (
    <ListContent>
      <PostOwner> {nickname} </PostOwner>
      <PostCreateDate> {createAt} </PostCreateDate>
      <PostLike> {likes} </PostLike>
    </ListContent>
  );
}

export default PostContent;

const ListContent = styled.div`
  display: flex;
  font-size: 0.8rem;
  align-items: center;
  @media ${({ theme }) => theme.device.webMiddle} {
    font-size: 0.7rem;
    padding-top: 0.3em;
  }
  @media ${({ theme }) => theme.device.ipad} {
    font-size: 0.8rem;
    padding-top: 0.5em;
  }
  @media ${({ theme }) => theme.device.mobileMiddle} {
    padding-top: 0.8em;
  }
`;

const PostOwner = styled.p`
  width: 23%;
  @media ${({ theme }) => theme.device.mobileMiddle} {
    width: 30%;
    font-size: 0.7rem;
  }
`;

const PostCreateDate = styled(PostOwner)`
`;

const PostLike = styled.p`
  display: flex;
  color: ${({ theme }) => theme.color.red};
  &::before {
    content: '';
    width: 15px;
    height: 15px;
    display: block;
    background: url(${heartFill});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    padding-right: 5px;
  }
  margin-left: 10px;
  margin-right: 10px;
`;