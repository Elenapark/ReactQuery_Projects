import React, { useState } from "react";
import { useQuery } from "react-query";
import PostDetails from "./PostDetails";

const MAX_PAGES = 10;

async function fetchPosts(page) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
  );
  return response.json();
}

const BlogPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const { data, isLoading, isError, error } = useQuery(
    // 의존성배열처럼 사용
    // currentPage state가 바뀌면 쿼리 키가 바뀌므로 useQuery에 새로운 쿼리를 알려서 데이터를 다시 가져옴
    ["posts", currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 2000,
    }
  );
  // isFetching : the async query function hasn't yet resolved
  // isLoading : no cached data, plus isFetching
  if (isLoading) return <div>Loading...</div>;
  // 에러를 발생시키기 전에 3번 fetch 시도를 함
  if (isError)
    return (
      <>
        <h3>Something went wrong.</h3>
        <p>{(error as any).toString()}</p>
      </>
    );

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= MAX_PAGES}
          onClick={() => {
            setCurrentPage((pre) => pre + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetails post={selectedPost} />}
    </>
  );
};

export default BlogPosts;
