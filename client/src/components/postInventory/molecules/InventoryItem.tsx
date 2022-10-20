import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ItemTitle from '../atoms/ItemTitle';
import ItemPara from '../atoms/ItemPara';
import Profile from './Profile';
import TagList from './TagList';
import IconWithValue from '../atoms/IconWithValue';
import heartFill from '../../../asset/icons/icon-heart-fill.svg';
import eye from '../../../asset/icons/icon-eye.svg';

const ItemBox = styled.div`
  position: relative;
  height: 255px;
  border: 2px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 20px;
  padding: 31px 21px;
  cursor: pointer;
`;

const ItemAnchor = styled(Link)``;

const ItemEtc = styled.div`
  display: flex;
  margin-left: 4px;
  margin-bottom: 10px;
`;

const ItemDate = styled.div`
  width: 100%;
  font-size: 10px;
  font-weight: 600;
  line-height: 16px;
  text-align: right;
  color: ${({ theme }) => theme.color.darkGray};
`;

function InventoryItem() {
  return (
    <ItemBox>
      <ItemAnchor to='/post/view/632bc900b4a156b3ed2f7a28'>
        <ItemTitle>요즘 학업에 너무 집중이 안되요.</ItemTitle>
        <Profile width='23px' height='23px' imgUrl='users/default.png'>
          한국사
        </Profile>
        <ItemPara>
          요즘 학업에 너무 집중이 안 되서 그러는데, 혹시 집중할 수 있는 방법 알고 계신분 계실까요? 스트레스가 장난이
          아니네요..
        </ItemPara>
        <ItemEtc>
          <IconWithValue icon={eye} value='2' />
          <IconWithValue icon={heartFill} value='2' />
        </ItemEtc>
        <TagList hashtagArr={['학업', '집중', '스트레스']} />
        <ItemDate>2022년 9월 22일</ItemDate>
      </ItemAnchor>
    </ItemBox>
  );
}

export default InventoryItem;
