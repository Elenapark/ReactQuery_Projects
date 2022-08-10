import React from "react";
import { useQuery } from "react-query";

async function fetchComments(postId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

const PostDetails = ({ post }) => {
  // 새로운 게시물을 클릭해도 코멘트가 제일 처음 게시물의 코멘트만 보여주는 이유?
  // 모든 쿼리가 같은 query key를 사용하고 있음 (commet)
  // 이미 알려진 key의 쿼리데이터는 특정한 트리거가 있을 경우에만 리페칭됨
  // examples
  // 컴포넌트 리마운트
  // 윈도우 리포커싱
  // refetch 함수 실행
  // automated refetch
  // mutation 이후의 query invalidation
  const { data, isLoading, isError, error } = useQuery(
    ["comment", post.id],
    () => fetchComments(post.id),
    {
      cacheTime: 5 * 60 * 1000,
      staleTime: 3000,
    }
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <>
        <h3>Something went wrong.</h3>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
};

export default PostDetails;
