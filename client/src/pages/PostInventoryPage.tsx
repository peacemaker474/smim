import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components';
import axios from 'axios';
import InventoryItem from '../components/postInventory/molecules/InventoryItem';

const http = 'http://localhost:4000';

// interface QueryKey {
//   pageParam: number;
// }

interface SearchList {
  inputs: string;
  option: string;
}

const getPostListRead = (targetAge: string | undefined, filter: any, data: any, page = 1) => {
  return axios.get(
    `${http}/post/target?age=${targetAge}&page=${page}&filter=${filter}&tag=${data.option}&keyword=${data.inputs}`,
  );
};

function PostInventoryPage() {
  const obsRef = useRef(null);
  const { age } = useParams();
  const postFilter = '';
  const searchList: SearchList = { inputs: '', option: '' };

  console.log(age);

  const loadedPostListData = async (pageParam: number) => {
    try {
      const response = await getPostListRead(age, postFilter, searchList, pageParam);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
    'postArray',
    ({ pageParam }) => loadedPostListData(pageParam),
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.page + 1;
        return currentPage.lastPage ? null : nextPage;
      },
    },
  );

  useEffect(() => {
    if (!hasNextPage) {
      return;
    }
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      }),
    );
    const el = obsRef && obsRef.current;
    if (!el) {
      return;
    }
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [hasNextPage, fetchNextPage]);

  console.log(isLoading);
  console.log(data);

  if (age === '10' || age === '20' || age === '30' || age === '40' || age === '50') {
    return (
      <InventoryMain>
        <InventoryContainer>
          <InventoryHeading>{age}대 질문리스트</InventoryHeading>
          <PostListBodyContainer>
            <PostListBodyLayout>
              <InventoryItem />
              <InventoryItem />
              <InventoryItem />
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
