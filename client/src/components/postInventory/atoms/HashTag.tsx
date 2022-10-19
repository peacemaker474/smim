import styled from 'styled-components';

interface TagProps {
  children: string;
  padding?: string;
  marginLeft?: string;
}

const Tag = styled.span<{ padding?: string; marginLeft?: string }>`
  display: inline-block;
  height: 18px;
  border-radius: 13px;
  color: #183347;
  background: ${({ theme }) => theme.tagColor.yellow};
  font-size: 12px;
  font-weight: 700;
  line-height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ padding }) => padding || '12px 9px'};
  & + span {
    margin-left: ${({ marginLeft }) => marginLeft || 'none'};
  }
`;

function HashTag({ children, padding, marginLeft }: TagProps) {
  return (
    <Tag padding={padding} marginLeft={marginLeft}>
      {children}
    </Tag>
  );
}

export default HashTag;
