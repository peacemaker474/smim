import styled from 'styled-components';
import HashTag from '../atoms/HashTag';

interface TagListProps {
  marginLeft?: string;
  padding?: string;
  hashtagArr: Array<string>;
}

const TagListDiv = styled.div`
  margin-bottom: 20px;
`;
const TagUl = styled.div`
  display: flex;
  height: 24px;
`;

function TagList({ hashtagArr, padding, marginLeft }: TagListProps) {
  return (
    <TagListDiv>
      <TagUl>
        {hashtagArr.map((el) => (
          <HashTag padding={padding} marginLeft={marginLeft}>
            {el}
          </HashTag>
        ))}
      </TagUl>
    </TagListDiv>
  );
}

export default TagList;
