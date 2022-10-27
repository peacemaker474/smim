import styled from 'styled-components';
import SearchForm from '../atoms/SearchForm';
import SelectBox from '../atoms/SelectBox';

// interface PostFilterOption {
//   option: string;
//   inputs: string;
// }

interface SearchBoxOption {
  // setPostFilter: Dispatch<SetStateAction<string>>;
  // setSearchData: Dispatch<SetStateAction<PostFilterOption>>;
  age: string;
  // postFilter: any;
}

function SearchBox({ age }: SearchBoxOption) {
  // useEffect(() => {
  //   // search Data and post filter reset
  //   setSearchData({ option: '', inputs: '' });
  //   setPostFilter('newer');

  //   return () => {
  //     setSearchData({ option: '', inputs: '' });
  //     setPostFilter('newer');
  //   };
  // }, [age, setPostFilter, setSearchData]);

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
