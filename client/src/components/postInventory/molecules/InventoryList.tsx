import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components';
import useObserve from '../../../hooks/useObserve';
import { getPostListRead } from '../../../networks/post/http';
import { useAppSelector } from '../../../redux/hooks';
import InventoryItem from '../atoms/InventoryItem';
import DropdownBox from '../../common/molecules/DropdownBox';

// interface SearchData {
//   option: string;
//   inputs: string;
// }

// interface InventoryProps {
//   postFilter: string;
//   searchData: SearchData;
// }

// interface QueryKey {
//   age: string | undefined;
//   postFilter: string;
//   searchData: SearchData;
// }

interface LoadedPostProps {
  queryKey: any;
  pageParam: number;
}

function InventoryList() {
  const obsRef = useRef(null);
  const { age } = useParams();
  const searchData = useAppSelector((state) => state.searchKeyword);
  const postFilter = useAppSelector((state) => state.searchFilter);

  const loadedPostListData = async ({ queryKey, pageParam = 1 }: LoadedPostProps) => {
    const { age, postFilter, searchData } = queryKey[1];
    const response = await getPostListRead(age, postFilter, searchData, pageParam);
    return response.data;
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

  return (
    <PostListBodyContainer>
      <DropdownBox />
      <PostListBodyLayout>
        {postData && (
          <>
            {postData.pages.map((item) => {
              return item.data.map((el: any) => <InventoryItem key={el._id} postData={el} />);
            })}
          </>
        )}
        <div ref={obsRef} />
      </PostListBodyLayout>
    </PostListBodyContainer>
  );
}

export default InventoryList;

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
