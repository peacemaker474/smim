import styled from 'styled-components';

export const Tag = styled.span`
  display: inline-block;
  width: 38px;
  height: 15px;
  border-radius: 8px;
  color: #183347;
  background: ${({ palette, theme }) => theme.tagColor[palette]};
  font-size: 9px;
  font-weight: 500;
  line-height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
