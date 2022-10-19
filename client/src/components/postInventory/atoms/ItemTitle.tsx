import styled from 'styled-components';

interface ItemTitleProps {
  children: string;
}

const Title = styled.h2`
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

function ItemTitle({ children }: ItemTitleProps) {
  return <Title>{children}</Title>;
}

export default ItemTitle;
