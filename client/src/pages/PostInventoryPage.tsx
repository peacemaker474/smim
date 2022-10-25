import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components';
import useObserve from '../hooks/useObserve';
import { getPostListRead } from '../networks/post/http';
import InventoryItem from '../components/postInventory/molecules/InventoryItem';
import SearchBox from '../components/search/molecules/SearchBox';

interface loadedDataProps {
  pageParam: number;
  queryKey: any;
}

function PostInventoryPage() {
  const obsRef = useRef(null);
  const { age } = useParams();
  const [postFilter, setPostFilter] = useState('newer');
  const [searchData, setSearchData] = useState({
    option: '',
    inputs: '',
  });

  const loadedPostListData = async ({ queryKey, pageParam = 1 }: loadedDataProps) => {
    const { age, postFilter, searchData } = queryKey[1];
    try {
      const response = await getPostListRead(age, postFilter, searchData, pageParam);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const {
    data: postData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ['postArray', { age, postFilter, searchData }],
    ({ queryKey, pageParam }) => loadedPostListData({ queryKey, pageParam }),
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.page + 1;
        return currentPage.lastPage ? null : nextPage;
      },
    },
  );
  useObserve(obsRef, hasNextPage, fetchNextPage);

  if (age === '10' || age === '20' || age === '30' || age === '40' || age === '50') {
    return (
      <InventoryMain>
        <InventoryContainer>
          <InventoryHeading>{age}대 질문리스트</InventoryHeading>
          <SearchBox postFilter={postFilter} setSearchData={setSearchData} setPostFilter={setPostFilter} age={age} />
          <PostListBodyContainer>
            <PostListBodyLayout>
              {postData ? (
                <>
                  {postData.pages.map((item) => {
                    return item.data.map((el: any) => <InventoryItem key={el._id} postData={el} />);
                  })}
                </>
              ) : null}
              <div ref={obsRef} />
            </PostListBodyLayout>
          </PostListBodyContainer>
        </InventoryContainer>
      </InventoryMain>
    );
  }
  return <>NotFound</>;
}

export default PostInventoryPage;

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

const PostListBodyContainer = styled.div`
  margin-top: 67px;
`;

const PostListBodyLayout = styled.div`
  display: grid;
  grid-template-columns: 234px 234px 234px;
  gap: 20px 14px;
  position: relative;
  // height: 250px;
  @media screen and (max-width: 588px) {
    grid-template-columns: 252px;
    margin-top: 35px;
  }
  @media (min-width: 588px) and (max-width: 850px) {
    grid-template-columns: 234px 234px;
  }
`;
