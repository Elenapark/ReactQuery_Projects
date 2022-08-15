import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import Person from "./Person";

import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/people/";

const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const InfinitePeople = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => {
        // lastPage는 직전 데이터인 data.page[0]와 동일함
        // lastPage.next가 있으면 hasNextPage가 true가 되고 pageparam에 lastPage.next를 할당, 계속 스크롤링됨
        // lastPage.next가 null이면 다음 페이지가 없음을 의미, pageparam에 lastPage.next를 할당하는 대신
        // hasNextPage에 undefined가 할당되어 스크롤이 끝남.
        return lastPage.next || undefined;
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occured.{(error as string).toString()}</div>;

  return (
    <>
      {isFetching && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            backgroundColor: "gold",
          }}
        >
          fetching more data..
        </div>
      )}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data?.pages.map((pageData) => {
          return pageData.results.map((person) => {
            return (
              <Person
                name={person.name}
                hairColor={person.hair_color}
                eyeColor={person.eye_color}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
};

export default InfinitePeople;
