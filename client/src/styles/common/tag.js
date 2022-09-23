import styled from 'styled-components';

export const Tag = styled.span`
  display: inline-block;
  height: 18px;
  border-radius: 13px;
  color: #183347;
  background: ${({ theme }) => theme.tagColor['yellow']};
  font-size: 12px;
  font-weight: 700;
  line-height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ padding }) => padding || '12px 9px'};
`;
