import React, { useState } from "react";
import { useQuery } from "react-query";
import PostDetails from "./PostDetails";

const MAX_PAGES = 10;

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

const BlogPosts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const { data, isLoading, isError, error } = useQuery("posts", fetchPosts, {
    staleTime: 2000,
  });
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
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetails post={selectedPost} />}
    </>
  );
};

export default BlogPosts;
