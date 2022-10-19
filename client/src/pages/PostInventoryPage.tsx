import styled from 'styled-components';
import InventoryBody from '../components/postInventory/organisms/InventoryBody';

const InventoryMain = styled.main``;

const InventoryContainer = styled.div`
  margin: 100px auto 0;
  padding: 70px 0 200px;
  width: 730px;
  @media screen and (max-width: 588px) {
    width: 252px;
    padding: 50px 0;
  }
  @media (min-width: 588px) and (max-width: 850px) {
    width: 482px;
  }
`;

const InventoryHeading = styled.h2`
  font-size: 32px;
  margin-bottom: 90px;
  text-align: center;
  @media screen and (max-width: 588px) {
    font-size: 27px;
    margin-bottom: 54px;
  }
`;

function PostInventoryPage() {
  return (
    <InventoryMain>
      <InventoryContainer>
        <InventoryHeading>20대 질문리스트</InventoryHeading>
        <InventoryBody />
      </InventoryContainer>
    </InventoryMain>
  );
}

export default PostInventoryPage;
