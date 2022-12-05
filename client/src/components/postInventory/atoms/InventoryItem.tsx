import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PostDetailData } from '../../../type/postTypes';
import Profile from '../../common/atoms/Profile';
import TagList from '../../common/atoms/TagList';
import getDate from '../../../utils/changeDate';
import limitHashtag from '../../../utils/limitHashtag';
import heartFill from '../../../asset/icons/icon-heart-fill.svg';
import eye from '../../../asset/icons/icon-eye.svg';

interface InventoryItemProps {
  postData: PostDetailData;
}

function InventoryItem({ postData }: InventoryItemProps) {
  const {
    meta,
    content,
    updateAt,
    hashtag,
    title,
    _id,
    owner: { nickname, imageUrl },
  } = postData;

  const postDate = getDate(updateAt);
  const hashtagEdition = limitHashtag(hashtag);

  return (
    <ItemBox>
      <ItemAnchor to={`/post/view/${_id}`}>
        <ItemTitle>{title}</ItemTitle>
        <Profile width="23px" height="23px" imgUrl={imageUrl}>
          {nickname}
        </Profile>
        <Para dangerouslySetInnerHTML={{ __html: content }} />
        <ItemEtc>
          <WithValue icon={heartFill}>{meta.likes}</WithValue>
          <WithValue icon={eye}>{meta.views}</WithValue>
        </ItemEtc>
        <TagList hashtagArr={hashtagEdition} marginLeft="5px" />
        <ItemDate>{postDate}</ItemDate>
      </ItemAnchor>
    </ItemBox>
  );
}

export default InventoryItem;

const ItemBox = styled.div`
  position: relative;
  height: 255px;
  border: 2px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 20px;
  padding: 31px 21px;
  cursor: pointer;
`;

const ItemAnchor = styled(Link)``;

const ItemTitle = styled.h2`
  height: 21px;
  margin-bottom: 10px;
  overflow: hidden;
  color: ${({ theme }) => theme.color.black};
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Para = styled.p`
  height: 35px;
  font-size: 12px;
  font-weight: 700;
  line-height: 17px;
  margin-bottom: 14px;
  color: ${({ theme }) => theme.color.black};
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ItemEtc = styled.div`
  display: flex;
  margin-left: 4px;
  margin-bottom: 10px;
`;

const WithValue = styled.span<{ icon: string }>`
  display: flex;
  align-items: center;
  font-size: 12px;
  &::before {
    width: 16px;
    height: 16px;
    background: url(${({ icon }) => icon});
    display: block;
    content: '';
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: 4px;
  }
  & + span {
    margin-left: 10px;
  }
`;

const ItemDate = styled.div`
  width: 100%;
  font-size: 10px;
  font-weight: 600;
  line-height: 16px;
  text-align: right;
  color: ${({ theme }) => theme.color.darkGray};
`;
