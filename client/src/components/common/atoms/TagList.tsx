import styled from 'styled-components';

interface TagListProps {
  marginLeft?: string;
  padding?: string;
  hashtagArr: Array<string>;
}

function TagList({ hashtagArr, padding, marginLeft }: TagListProps) {
  return (
    <TagListDiv>
      <TagUl>
        {hashtagArr.map((el) => (
          <Tag key={el} padding={padding} marginLeft={marginLeft}>
            {el}
          </Tag>
        ))}
      </TagUl>
    </TagListDiv>
  );
}

export default TagList;

const TagListDiv = styled.div`
  margin-bottom: 20px;
`;
const TagUl = styled.div`
  display: flex;
  height: 24px;
`;

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
