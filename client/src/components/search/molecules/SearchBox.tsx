import styled from 'styled-components';
import SearchForm from '../atoms/SearchForm';
import SelectBox from '../atoms/SelectBox';

interface SearchBoxOption {
  age: string;
}

function SearchBox({ age }: SearchBoxOption) {
  return (
    <SearchContainer>
      <SearchForm
        name="sort"
        optionArr={[
          { value: '', text: '선택' },
          { value: 'title', text: '제목' },
          { value: 'hashtag', text: '태그' },
          { value: 'content', text: '내용' },
        ]}
        age={age}
      />
      <SelectBox
        optionArr={[
          { value: 'newer', text: '최근 게시물' },
          { value: 'popular', text: '인기 게시물' },
          { value: 'older', text: '오래된 게시물' },
        ]}
        name="postSort"
      />
    </SearchContainer>
  );
}

export default SearchBox;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 588px) {
    display: block;
    height: auto;
  }
`;
