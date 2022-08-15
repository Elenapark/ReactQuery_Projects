import React, { useCallback, useEffect, useRef } from "react";
import Species from "./Species";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/species/";

const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const options = {
  rootMargin: "0px",
  threshold: 0.5,
};

const InfiniteSpecies = () => {
  const target = useRef(null);
  console.log("render");

  const { data, fetchNextPage, isFetching, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      "sw-species",
      ({ pageParam = initialUrl }) => {
        console.log(pageParam);
        return fetchUrl(pageParam);
      },
      {
        getNextPageParam: (lastPage) => {
          console.log(lastPage);
          return lastPage.next || undefined;
        },
        refetchOnWindowFocus: false,
      }
    );

  // 굳이 useCallback을 쓰지 않고 밖으로 빼내어 써도 됨
  const handleIntersect = useCallback(
    (entries, observer) => {
      const target = entries[0];
      console.log(
        "들어옴",
        target.isIntersecting && hasNextPage && !isFetching
      );

      if (target.isIntersecting && hasNextPage && !isFetching) {
        console.log("다음다음다음");
        fetchNextPage();
      }
    },
    [hasNextPage]
  );

  useEffect(() => {
    // 다음 페이지가 없을 때는 early return
    // root: 대상 객체의 가시성을 확인할때 사용되는 뷰포트 요소, null 입력 시 기본값으로 브라우저의 뷰포트가 설정됨.
    // rootMargin: root가 가진 여백
    // treshold: 대상 요소가 50% 만큼 보여질떄 콜백함수가 실행됨

    if (!target.current) return;
    const observer = new IntersectionObserver(handleIntersect, options);

    observer.observe(target.current);
    return () => observer.disconnect();
    // target, options는 한번만 생김
    // handleIntersect는 data가 바뀌고 -> hasNextPage가 바뀔때에만 새로 생김!!!!!!!!
  }, [target, handleIntersect, options]);

  return (
    <>
      {data?.pages.map((pageData, pageIndex) => {
        return pageData.results.map((species, speciesIndex) => {
          return (
            <Species
              key={species.name}
              name={species.name}
              language={species.language}
              averageLifespan={species.averageLifespan}
            />
          );
        });
      })}

      {data && !hasNextPage && <div>다불러와씀</div>}
      {isFetching && <div>fetching more data..</div>}

      <div ref={target} style={{ height: "30px" }}></div>
    </>
  );
};

export default InfiniteSpecies;
